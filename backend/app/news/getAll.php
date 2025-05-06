<?php 
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../utils/response.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
$sql = "SELECT * FROM News ORDER BY id DESC";
$result = $conn->query($sql);
$news = [];
while ($row = $result->fetch_assoc()) {
    $news[] = $row;
}
sendResponse($news);
?>