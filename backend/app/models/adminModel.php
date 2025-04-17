<?php
require_once __DIR__ . '/../config/database.php';

class AdminModel {
    public static function findAdminByUserName($userName) {
        global $conn;
        $stmt = $conn->prepare("SELECT * FROM admin WHERE user_name = ? LIMIT 1");
        $stmt->bind_param("s", $userName);
        $stmt->execute();
        return $stmt->get_result()->fetch_assoc();
    }

    public static function findAdminById($id)
    {
        global $conn;
        $stmt = $conn->prepare("SELECT id, user_name, first_name, last_name FROM admin WHERE id = ? LIMIT 1");
        $stmt->bind_param("s", $id);
        $stmt->execute();
        return $stmt->get_result()->fetch_assoc();
    }

    public static function createAdmin($user_name, $password, $first_name, $last_name)
    {
        global $conn;
        $hashed = password_hash($password, PASSWORD_BCRYPT);
        $stmt = $conn->prepare("INSERT INTO admin (user_name, password, first_name, last_name) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssss", $user_name, $hashed, $first_name, $last_name);
        return $stmt->execute();
    }
}
?>