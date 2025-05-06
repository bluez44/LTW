<?php
require_once __DIR__ . '/../middleware/checkRole.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../utils/response.php';
header("Access-Control-Allow-Origin: *");

// Nếu là POST request (như create.php), cần thêm:
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
// ✅ Xử lý preflight request (OPTIONS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
// Cho phép cả user và admin
$user = checkRole(['user', 'admin']);

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['product_id']) || !isset($data['content'])) {
    sendError('Missing required fields', 400);
}

$productId = $data['product_id'];
$content = $data['content'];

$sql = "INSERT INTO Comment (product_id, user_id, content, created_at) VALUES (?, ?, ?, NOW())";
$stmt = $conn->prepare($sql);
$stmt->bind_param('iis', $productId, $user->sub, $content);
$stmt->execute();

sendResponse(['message' => 'Comment added']);
?>