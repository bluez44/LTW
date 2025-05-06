<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../utils/response.php';

$data = json_decode(file_get_contents("php://input"), true);

// Lấy thông tin từ request
$user_name = $data['user_name'] ?? '';
$email = $data['email'] ?? '';
$password = password_hash($data['password'] ?? '', PASSWORD_DEFAULT);
$phone_number = $data['phone_number'] ?? null;
$birth_day = $data['birth_day'] ?? null;
$first_name = $data['first_name'] ?? null;
$last_name = $data['last_name'] ?? null;

// 1. Thêm vào bảng Account
$sql = "INSERT INTO Account (role) VALUES ('user')";
$stmt = $conn->prepare($sql);
if ($stmt->execute()) {
    $account_id = $conn->insert_id;

    // 2. Thêm vào bảng User
    $sql2 = "INSERT INTO User (password, account_id, email, user_name, phone_number, birth_day, first_name, last_name)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt2 = $conn->prepare($sql2);
    $stmt2->bind_param(
        'sissssss',
        $password,
        $account_id,
        $email,
        $user_name,
        $phone_number,
        $birth_day,
        $first_name,
        $last_name
    );

    if ($stmt2->execute()) {
        sendResponse(['message' => 'User registered successfully']);
    } else {
        sendError('Failed to create User: ' . $stmt2->error);
    }
} else {
    sendError('Failed to create Account: ' . $stmt->error);
}
?>