<?php
require_once __DIR__ . '/../vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

define('JWT_SECRET', 'your_secret_key_here');

function generateJWT($user) {
    $payload = [
        'sub' => $user['account_id'], // dùng account_id thay vì id
        'role' => $user['role'],
        'username' => $user['username'] ?? null,
        'iat' => time(),
        'exp' => time() + 3600 // token hết hạn sau 1 giờ
    ];
    return JWT::encode($payload, JWT_SECRET, 'HS256');
}

function decodeJWT($token) {
    return JWT::decode($token, new Key(JWT_SECRET, 'HS256'));
}
?>