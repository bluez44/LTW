<?php
$path = parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH);
$method = $_SERVER["REQUEST_METHOD"];

$url = "/LTW_ASS/backend/app/public";

require_once __DIR__ . '/../middleware/Cors.php';

require_once __DIR__ . '/../controllers/AdminController.php';
require_once __DIR__ . '/../controllers/AuthController.php';
require_once __DIR__ . '/../controllers/UserController.php';
require_once __DIR__ . '/../controllers/GuestController.php';


if ($path === $url . '/login' && $method === 'POST') {
    login();
} elseif ($path === $url . '/register' && $method === 'POST') {
    register();
} elseif ($path === $url . '/logout' && $method === 'POST') {
    logout();
} elseif ($path === $url . '/profile' && $method === 'GET') {
    profile();
} elseif ($path === $url . '/admin/login' && $method === 'POST') {
    adminLogin();
} elseif ($path === $url . '/admin/register' && $method === 'POST') {
    adminRegister();
} elseif ($path === $url . '/contact' && $method === 'POST') {
    sendContactForm();
} else {
    http_response_code(404);
    echo json_encode(['message' => 'Not Found ' . $path . " " . $method]);
}
?>