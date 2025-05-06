<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../utils/jwt_helper.php';
require_once __DIR__ . '/../utils/response.php';

$data = json_decode(file_get_contents("php://input"), true);
$user_name = $data['user_name'] ?? '';
$password = $data['password'] ?? '';

// Truy vấn kết hợp từ bảng User và Account
$sql = "SELECT A.id as account_id, A.role, U.password 
        FROM User U 
        JOIN Account A ON U.account_id = A.id 
        WHERE U.user_name = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('s', $user_name);
$stmt->execute();
$result = $stmt->get_result();

if ($user = $result->fetch_assoc()) {
    if (password_verify($password, $user['password'])) {
        $tokenPayload = [
            'account_id' => $user['account_id'],
            'role' => $user['role'],
            'user_name' => $user_name
        ];
        $token = generateJWT($tokenPayload);
        sendResponse(['token' => $token]);
    }
}

sendError('Invalid username or password', 401);
?>