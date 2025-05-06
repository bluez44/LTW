<?php 
require_once __DIR__ . '/../middleware/checkRole.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../utils/response.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, OPTIONS");
checkRole('admin');
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['id'], $data['title'], $data['description'], $data['datetime'], $data['image'])) {
    sendError('Missing required fields: id, title, description, datetime, image', 400);
}

$id = intval($data['id']);
$title = trim($data['title']);
$content = trim($data['description']);
$media_url = trim($data['image']);

// Chuẩn hóa datetime: tách ra phần thời gian và ngày tháng
$datetimeStr = trim($data['datetime']);
$parts = explode('|', $datetimeStr);

if (count($parts) !== 2) {
    sendError('Invalid datetime format. Expected format: "h:i A | d/m/Y"', 400);
}

$timePart = trim($parts[0]); // "8:00 PM"
$datePart = trim($parts[1]); // "22/03/2025"

$finalDatetimeStr = "$datePart $timePart"; // "22/03/2025 8:00 PM"

// Parse với định dạng cụ thể
$dt = DateTime::createFromFormat('d/m/Y h:i A', $finalDatetimeStr);
if (!$dt) {
    sendError('Invalid datetime format. Failed to parse: "' . $finalDatetimeStr . '"', 400);
}

$created_at = $dt->format('Y-m-d H:i:s');

$sql = "INSERT INTO News (id, title, content, created_at, media_url) VALUES (?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param('issss', $id, $title, $content, $created_at, $media_url);

if ($stmt->execute()) {
    sendResponse(['message' => 'News created successfully', 'id' => $id]);
} else {
    sendError('Failed to create news: ' . $stmt->error, 500);
}
?>
