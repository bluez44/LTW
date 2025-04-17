<?php
require_once __DIR__ . '/../config/database.php';

class UserModel {
    public static function findUserByUserName($userName) {
        global $conn;
        $stmt = $conn->prepare("SELECT * FROM user WHERE email = ? OR user_name = ? LIMIT 1");
        $stmt->bind_param("ss", $userName, $userName);
        $stmt->execute();
        return $stmt->get_result()->fetch_assoc();
    }

    public static function findUserById($id)
    {
        global $conn;
        $stmt = $conn->prepare("SELECT id, email, user_name, first_name, last_name, phone_number, birth_day FROM user WHERE id = ? LIMIT 1");
        $stmt->bind_param("s", $id);
        $stmt->execute();
        return $stmt->get_result()->fetch_assoc();
    }

    public static function createUser($email, $user_name, $password, $first_name, $last_name, $phone_number, $birth_day) {
        global $conn;
        $hashed = password_hash($password, PASSWORD_BCRYPT);
        $stmt = $conn->prepare("INSERT INTO user (email, user_name, password, first_name, last_name, phone_number, birth_day) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("sssssss", $email, $user_name, $hashed, $first_name, $last_name, $phone_number, $birth_day);
        return $stmt->execute();
    }
}
?>