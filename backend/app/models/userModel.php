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
        $stmt = $conn->prepare("SELECT id, email, user_name, first_name, last_name, phone_number, birth_day, avatar_url FROM user WHERE id = ? LIMIT 1");
        $stmt->bind_param("s", $id);
        $stmt->execute();
        return $stmt->get_result()->fetch_assoc();
    }

    public static function createUser($email, $user_name, $password, $first_name, $last_name, $phone_number, $birth_day, $avatar_url) {
        global $conn;
        $hashed = password_hash($password, PASSWORD_BCRYPT);
        $stmt = $conn->prepare("INSERT INTO user (email, user_name, password, first_name, last_name, phone_number, birth_day, avatar_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("ssssssss", $email, $user_name, $hashed, $first_name, $last_name, $phone_number, $birth_day, $avatar_url);
        return $stmt->execute();
    }

    public static function updateUser($id, $email, $user_name, $password, $first_name, $last_name, $phone_number, $birth_day, $avatar_url) {
        global $conn;
        $hashed = password_hash($password, PASSWORD_BCRYPT);
        $stmt = $conn->prepare("UPDATE user SET email = ?, user_name = ?, password = ?, first_name = ?, last_name = ?, phone_number = ?, birth_day = ?, avatar_url = ? WHERE id = ?");
        $stmt->bind_param("ssssssssi", $email, $user_name, $hashed, $first_name, $last_name, $phone_number, $birth_day, $avatar_url, $id);
        return $stmt->execute();
    }

    public static function getUserFullNameByAcountId($account_id){
        global $conn;
        $user_sql = "SELECT first_name, last_name FROM user WHERE account_id = ?";
        $user_stmt = $conn->prepare($user_sql);
        $user_stmt->bind_param("i", $account_id);
        $user_stmt->execute();
        return $user_stmt->get_result();
    }
}
?>