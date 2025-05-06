<?php
require_once __DIR__ . '/../utils/jwt_helper.php';
require_once __DIR__ . '/../utils/response.php';

function getAuthorizationHeader() {
    if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
        return trim($_SERVER["HTTP_AUTHORIZATION"]);
    } elseif (function_exists('apache_request_headers')) {
        $headers = apache_request_headers();
        foreach ($headers as $key => $value) {
            if (strtolower($key) === 'authorization') {
                return trim($value);
            }
        }
    }
    return null;
}
function getBearerToken() {
    $header = getAuthorizationHeader();
    if ($header && preg_match('/Bearer\s(\S+)/', $header, $matches)) {
        return $matches[1];
    }
    return null;
}
function verifyToken() {
    $token = getBearerToken();
    if (!$token) {
        sendError('Unauthorized: No token provided', 401);
        exit;
    }

    try {
        return decodeJWT($token);
    } catch (Exception $e) {
        sendError('Unauthorized: Invalid token', 401);
        exit;
    }
}
?>
