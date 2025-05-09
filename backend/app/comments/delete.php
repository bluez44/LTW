<?php
require_once __DIR__ . '/../middleware/checkRole.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../utils/response.php';

checkRole('admin');

// Lấy tham số id và product_id từ URL
$id = $_GET['id'] ?? 0;
$productId = $_GET['product_id'] ?? 0;

// Kiểm tra đầu vào hợp lệ
if (!$id || !$productId) {
    sendResponse(['error' => 'Missing id or product_id'], 400);
}

// Câu lệnh DELETE có điều kiện id và product_id
$sql = "DELETE FROM Comment WHERE id = ? AND product_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('ii', $id, $productId);
$stmt->execute();

// Kiểm tra có xóa được dòng nào không
if ($stmt->affected_rows > 0) {
    sendResponse(['message' => 'Comment deleted']);
} else {
    sendResponse(['error' => 'Comment not found or already deleted'], 404);
}
?>