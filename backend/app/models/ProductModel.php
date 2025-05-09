<?php
require_once __DIR__ . '/../config/database.php';

class ProductModel {
    public static function getAllProducts() {
        global $conn;
        $stmt = $conn->prepare("
            SELECT p.id, p.name, p.description, p.img_url, pt.price, pt.exchange_amount, pt.id as patch_id
            FROM product p
            JOIN patch pt ON p.id = pt.product_id
        ");
        if ($stmt === false) {
            throw new Exception("Prepare failed: " . $conn->error);
        }
        $stmt->execute();
        return $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    }

    public static function findProductById($id) {
        global $conn;
        $stmt = $conn->prepare("
            SELECT p.id, p.name, p.description, p.img_url, pt.price, pt.exchange_amount, pt.id as patch_id
            FROM product p
            JOIN patch pt ON p.id = pt.product_id
            WHERE p.id = ?
        ");
        if ($stmt === false) {
            throw new Exception("Prepare failed: " . $conn->error);
        }
        $stmt->bind_param("i", $id);
        $stmt->execute();
        return $stmt->get_result()->fetch_assoc();
    }

    public static function createProduct($name, $description, $img_url, $price, $exchange_amount) {
        global $conn;
        $conn->begin_transaction();
        try {
            $stmt = $conn->prepare("INSERT INTO product (name, description, img_url) VALUES (?, ?, ?)");
            if ($stmt === false) {
                throw new Exception("Prepare failed: " . $conn->error);
            }
            $stmt->bind_param("sss", $name, $description, $img_url);
            $stmt->execute();
            $product_id = $conn->insert_id;

            $stmt = $conn->prepare("INSERT INTO patch (product_id, price, exchange_amount) VALUES (?, ?, ?)");
            if ($stmt === false) {
                throw new Exception("Prepare failed: " . $conn->error);
            }
            $stmt->bind_param("idi", $product_id, $price, $exchange_amount);
            $stmt->execute();

            $conn->commit();
            return $product_id;
        } catch (Exception $e) {
            $conn->rollback();
            throw $e;
        }
    }

    public static function updateProduct($id, $name, $description, $img_url, $price, $exchange_amount) {
        global $conn;
        $conn->begin_transaction();
        try {
            $stmt = $conn->prepare("UPDATE product SET name = ?, description = ?, img_url = ? WHERE id = ?");
            if ($stmt === false) {
                throw new Exception("Prepare failed: " . $conn->error);
            }
            $stmt->bind_param("sssi", $name, $description, $img_url, $id);
            $stmt->execute();

            $stmt = $conn->prepare("UPDATE patch SET price = ?, exchange_amount = ? WHERE product_id = ?");
            if ($stmt === false) {
                throw new Exception("Prepare failed: " . $conn->error);
            }
            $stmt->bind_param("dii", $price, $exchange_amount, $id);
            $stmt->execute();

            $conn->commit();
            return true;
        } catch (Exception $e) {
            $conn->rollback();
            throw $e;
        }
    }

    public static function deleteProduct($id) {
        global $conn;
        $conn->begin_transaction();
        try {
            $stmt = $conn->prepare("DELETE FROM patch WHERE product_id = ?");
            if ($stmt === false) {
                throw new Exception("Prepare failed: " . $conn->error);
            }
            $stmt->bind_param("i", $id);
            $stmt->execute();

            $stmt = $conn->prepare("DELETE FROM product WHERE id = ?");
            if ($stmt === false) {
                throw new Exception("Prepare failed: " . $conn->error);
            }
            $stmt->bind_param("i", $id);
            $stmt->execute();

            $conn->commit();
            return true;
        } catch (Exception $e) {
            $conn->rollback();
            throw $e;
        }
    }

    public static function findPatchById($patch_id) {
        global $conn;
        $stmt = $conn->prepare("SELECT * FROM patch WHERE id = ?");
        if ($stmt === false) {
            throw new Exception("Prepare failed: " . $conn->error);
        }
        $stmt->bind_param("i", $patch_id);
        $stmt->execute();
        return $stmt->get_result()->fetch_assoc();
    }

    public static function createOrder($receiver_name, $phone, $address, $total_payment, $items) {
        global $conn;
        $conn->begin_transaction();
        try {
            $stmt = $conn->prepare("
                INSERT INTO patch_order (receiver_name, phone, address, total_payment, status, created_at, cart_id)
                VALUES (?, ?, ?, ?, 'Pending', NOW(), NULL)
            ");
            if ($stmt === false) {
                throw new Exception("Prepare failed: " . $conn->error);
            }
            $stmt->bind_param("sssd", $receiver_name, $phone, $address, $total_payment);
            $stmt->execute();
            $order_id = $conn->insert_id;

            foreach ($items as $item) {
                $stmt = $conn->prepare("
                    INSERT INTO order_item (order_id, patch_id, quantity, price)
                    VALUES (?, ?, ?, ?)
                ");
                if ($stmt === false) {
                    throw new Exception("Prepare failed: " . $conn->error);
                }
                $stmt->bind_param("iiid", $order_id, $item['patch_id'], $item['quantity'], $item['price']);
                $stmt->execute();

                $stmt = $conn->prepare("
                    UPDATE patch
                    SET exchange_amount = exchange_amount - ?
                    WHERE id = ?
                ");
                if ($stmt === false) {
                    throw new Exception("Prepare failed: " . $conn->error);
                }
                $stmt->bind_param("ii", $item['quantity'], $item['patch_id']);
                $stmt->execute();
            }

            $conn->commit();
            return $order_id;
        } catch (Exception $e) {
            $conn->rollback();
            throw $e;
        }
    }

    public static function getOrders() {
        global $conn;
        $stmt = $conn->prepare("
            SELECT po.id as order_id, po.receiver_name, po.phone, po.address, po.total_payment,
                   po.status, po.created_at,
                   pt.id as patch_id, p.name, p.img_url, oi.quantity, oi.price
            FROM patch_order po
            LEFT JOIN order_item oi ON po.id = oi.order_id
            LEFT JOIN patch pt ON oi.patch_id = pt.id
            LEFT JOIN product p ON pt.product_id = p.id
            ORDER BY po.created_at DESC
        ");
        if ($stmt === false) {
            throw new Exception("Prepare failed: " . $conn->error);
        }
        $stmt->execute();
        $result = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);

        $orders = [];
        foreach ($result as $row) {
            $order_id = $row['order_id'];
            if (!isset($orders[$order_id])) {
                $orders[$order_id] = [
                    'order_id' => $order_id,
                    'receiver_name' => $row['receiver_name'],
                    'phone' => $row['phone'],
                    'address' => $row['address'],
                    'total_payment' => $row['total_payment'],
                    'status' => $row['status'],
                    'created_at' => $row['created_at'],
                    'items' => []
                ];
            }
            if ($row['patch_id']) {
                $orders[$order_id]['items'][] = [
                    'patch_id' => $row['patch_id'],
                    'name' => $row['name'],
                    'img_url' => $row['img_url'],
                    'price' => $row['price'],
                    'quantity' => $row['quantity']
                ];
            }
        }
        return array_values($orders);
    }
}
?>