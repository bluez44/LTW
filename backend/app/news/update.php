<?php 
require_once __DIR__ . '/../middleware/checkRole.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../utils/response.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, PUT, OPTIONS");
checkRole('admin');

$data = json_decode(file_get_contents("php://input"), true);

// Nếu dùng 'description' thay vì 'content', ta chuyển đổi sang:
if (isset($data['description']) && !isset($data['content'])) {
    $data['content'] = $data['description'];
}

// Kiểm tra các trường bắt buộc
$requiredFields = ['id', 'title', 'content', 'image'];
$missingFields = [];

foreach ($requiredFields as $field) {
    if (!isset($data[$field]) || trim($data[$field]) === '') {
        $missingFields[] = $field;
    }
}

if (!empty($missingFields)) {
    sendError('Missing required fields: ' . implode(', ', $missingFields), 400);
}

$id = (int)$data['id'];
$title = trim($data['title']);
$content = trim($data['content']);
$media_url = trim($data['image']);

// Xử lý datetime nếu có
$created_at = null;
if (isset($data['datetime']) && trim($data['datetime']) !== '') {
    $datetimeStr = trim($data['datetime']);
    $parts = explode('|', $datetimeStr);

    if (count($parts) === 2) {
        $timePart = trim($parts[0]);
        $datePart = trim($parts[1]);
        $finalDatetimeStr = "$datePart $timePart";

        $dt = DateTime::createFromFormat('d/m/Y h:i A', $finalDatetimeStr);
        if (!$dt) {
            $dt = DateTime::createFromFormat('d/m/Y g:i A', $finalDatetimeStr); // hỗ trợ định dạng khác
        }

        if (!$dt) {
            sendError('Invalid datetime format. Expected one of: "h:i A | d/m/Y", "g:i A | d/m/Y". Received: "' . $datetimeStr . '"', 400);
        }

        $created_at = $dt->format('Y-m-d H:i:s');
    } else {
        sendError('Invalid datetime format. Expected format: "h:i A | d/m/Y"', 400);
    }
}

// Cập nhật bản ghi
if ($created_at) {
    $sql = "UPDATE News SET title = ?, content = ?, media_url = ?, created_at = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ssssi', $title, $content, $media_url, $created_at, $id);
} else {
    $sql = "UPDATE News SET title = ?, content = ?, media_url = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('sssi', $title, $content, $media_url, $id);
}

if ($stmt->execute()) {
    sendResponse(['message' => 'News updated successfully']);
} else {
    sendError('Failed to update news: ' . $stmt->error, 500);
}
?>
