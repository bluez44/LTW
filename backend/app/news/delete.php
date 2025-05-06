<?php 
require_once __DIR__ . '/../middleware/checkRole.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../utils/response.php';

checkRole('admin');
$id = $_GET['id'] ?? 0;
$sql = "DELETE FROM News WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('i', $id);
$stmt->execute();
sendResponse(['message' => 'News deleted']);
?>