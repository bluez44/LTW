<?php 
require_once __DIR__ . '/../middleware/checkRole.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../utils/response.php';

checkRole('admin');

// Lấy id từ query string
$id = $_GET['id'] ?? 0;

// Kiểm tra xem tài khoản cần xóa có phải là admin hay không
$sqlCheckAdmin = "SELECT role FROM Account WHERE id = ?";
$stmt = $conn->prepare($sqlCheckAdmin);
$stmt->bind_param('i', $id);
$stmt->execute();
$result = $stmt->get_result();
$account = $result->fetch_assoc();

if ($account && $account['role'] == 'admin') {
    // Nếu tài khoản cần xóa là admin, không cho phép xóa
    sendError('Cannot delete an admin account.', 400);
}

// Bắt đầu giao dịch (transaction)
$conn->begin_transaction();

try {
    // Xóa các bản ghi trong bảng User liên quan đến Account
    $deleteUserSql = "DELETE FROM User WHERE account_id = ?";
    $stmt = $conn->prepare($deleteUserSql);
    $stmt->bind_param('i', $id);
    $stmt->execute();

    // Xóa bản ghi trong bảng Account
    $deleteAccountSql = "DELETE FROM Account WHERE id = ?";
    $stmt = $conn->prepare($deleteAccountSql);
    $stmt->bind_param('i', $id);
    $stmt->execute();

    // Commit giao dịch nếu không có lỗi
    $conn->commit();

    sendResponse(['message' => 'User deleted']);
} catch (Exception $e) {
    // Rollback giao dịch nếu có lỗi
    $conn->rollback();
    sendError('Error deleting user: ' . $e->getMessage(), 500);
}
?>