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
    if (!$token) return null;

    try {
        return JWT::decode($token, new Key($JWT_SECRET, 'HS256'));
    } catch (Exception $e) {
        return null;
    }
}

?>