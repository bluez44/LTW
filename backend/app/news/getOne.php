<?php 
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../utils/response.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
$id = $_GET['id'] ?? 0;
$sql = "SELECT * FROM News WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('i', $id);
$stmt->execute();
$result = $stmt->get_result();
sendResponse($result->fetch_assoc());
?>