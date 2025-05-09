<?php
require_once __DIR__ . '/../models/ProductModel.php';
require_once __DIR__ . '/../helpers/ResponseHelper.php';

function getProducts() {
    $products = ProductModel::getAllProducts();

    if (!$products) {
        response_json([
            'message' => 'Get products success',
            'data' => []
        ], 200);
        return;
    }

    response_json([
        'message' => 'Get products success',
        'data' => $products
    ], 200);
}

function getProductById($id) {
    $product = ProductModel::findProductById($id);

    if (!$product) {
        response_json(['message' => 'Sản phẩm không tồn tại'], 404);
        return;
    }

    response_json([
        'message' => 'Get product success',
        'data' => $product
    ], 200);
}

function addProduct() {
    $data = json_decode(file_get_contents("php://input"), true);
    $name = $data['name'] ?? '';
    $description = $data['description'] ?? '';
    $img_url = $data['img_url'] ?? '';
    $price = $data['price'] ?? 0;
    $exchange_amount = $data['exchange_amount'] ?? 0;

    if (!$name || !$description || $price <= 0 || $exchange_amount < 0) {
        response_json(['message' => 'Thông tin sản phẩm không hợp lệ'], 400);
        return;
    }

    $productId = ProductModel::createProduct($name, $description, $img_url, $price, $exchange_amount);

    if (!$productId) {
        response_json(['message' => 'Thêm sản phẩm thất bại'], 500);
        return;
    }

    response_json([
        'message' => 'Thêm sản phẩm thành công',
        'data' => ['id' => $productId]
    ], 201);
}

function updateProduct($id) {
    $product = ProductModel::findProductById($id);
    if (!$product) {
        response_json(['message' => 'Sản phẩm không tồn tại'], 404);
        return;
    }

    $data = json_decode(file_get_contents("php://input"), true);
    $name = $data['name'] ?? $product['name'];
    $description = $data['description'] ?? $product['description'];
    $img_url = $data['img_url'] ?? $product['img_url'];
    $price = $data['price'] ?? $product['price'];
    $exchange_amount = $data['exchange_amount'] ?? $product['exchange_amount'];

    if (ProductModel::updateProduct($id, $name, $description, $img_url, $price, $exchange_amount)) {
        response_json(['message' => 'Cập nhật sản phẩm thành công'], 200);
    } else {
        response_json(['message' => 'Cập nhật sản phẩm thất bại'], 500);
    }
}

function deleteProduct($id) {
    $product = ProductModel::findProductById($id);
    if (!$product) {
        response_json(['message' => 'Sản phẩm không tồn tại'], 404);
        return;
    }

    if (ProductModel::deleteProduct($id)) {
        response_json(['message' => 'Xóa sản phẩm thành công'], 200);
    } else {
        response_json(['message' => 'Xóa sản phẩm thất bại'], 500);
    }
}

function createOrder() {
    $data = json_decode(file_get_contents("php://input"), true);
    $receiver_name = $data['receiver_name'] ?? '';
    $phone = $data['phone'] ?? '';
    $address = $data['address'] ?? '';
    $total_payment = $data['total_payment'] ?? 0;
    $items = $data['items'] ?? [];

    if (!$receiver_name || !$phone || !$address || $total_payment <= 0 || empty($items)) {
        response_json(['message' => 'Thông tin đơn hàng không hợp lệ'], 400);
        return;
    }

    foreach ($items as $item) {
        $patch = ProductModel::findPatchById($item['patch_id']);
        if (!$patch || $patch['exchange_amount'] < $item['quantity']) {
            response_json(['message' => 'Sản phẩm không tồn tại hoặc số lượng không đủ'], 400);
            return;
        }
    }

    $orderId = ProductModel::createOrder($receiver_name, $phone, $address, $total_payment, $items);
    if ($orderId) {
        response_json([
            'message' => 'Tạo đơn hàng thành công',
            'data' => ['order_id' => $orderId]
        ], 201);
    } else {
        response_json(['message' => 'Tạo đơn hàng thất bại'], 500);
    }
}

function getOrders() {
    $orders = ProductModel::getOrders();

    response_json([
        'message' => 'Get orders success',
        'data' => $orders
    ], 200);
}
?>