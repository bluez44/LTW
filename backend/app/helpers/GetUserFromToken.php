<?php
require_once __DIR__ . '/../config/env.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$env = loadEnv();
$JWT_SECRET = $env['JWT_SECRET'];

function getUserFromToken()
{
    global $JWT_SECRET;
    $token = $_COOKIE['token'] ?? '';
    if (!$token) return response_json(['message' => 'Không có token hợp lệ'], 500);

    try {
        return JWT::decode($token, new Key($JWT_SECRET, 'HS256'));
    } catch (Exception $e) {
        return response_json(['message' => 'Có lỗi xảy ra'], 500);
    }
}

?>