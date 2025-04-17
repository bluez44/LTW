<?php
$path = parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH);
$method = $_SERVER["REQUEST_METHOD"];

$url = "/LTW_ASS/backend/app/public";
require_once __DIR__ . '/../controllers/AuthController.php';

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

if ($method === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($path === $url . '/login' && $method === 'POST') {
    login();
} elseif ($path === $url . '/register' && $method === 'POST') {
    register();
} elseif ($path === $url . '/logout' && $method === 'POST') {
    logout();
} elseif ($path === $url . '/profile' && $method === 'GET') {
    profile();
} else {
    http_response_code(404);
    echo json_encode(['message' => 'Not Found ' . $path . " " . $method]);
}
?>