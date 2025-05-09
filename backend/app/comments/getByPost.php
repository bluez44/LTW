<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../utils/response.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$productId = $_GET['product_id'] ?? 0;

$sql = "
    SELECT 
        Comment.id, 
        Comment.content, 
        Comment.created_at, 
        Comment.user_id, 
        Comment.product_id,
        COALESCE(User.user_name, Admin.user_name) AS user_name
    FROM Comment
    LEFT JOIN User ON Comment.user_id = User.id
    LEFT JOIN Admin ON Comment.user_id = Admin.id
    WHERE Comment.product_id = ?
    ORDER BY Comment.created_at DESC
";

$stmt = $conn->prepare($sql);
$stmt->bind_param('i', $productId);
$stmt->execute();
$result = $stmt->get_result();

$comments = [];
while ($row = $result->fetch_assoc()) {
    $comments[] = $row;
}

sendResponse($comments);
?>
