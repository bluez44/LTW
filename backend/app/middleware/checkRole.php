<?php
require_once __DIR__ . '/verifyToken.php';
require_once __DIR__ . '/../utils/response.php';

function checkRole($allowedRoles) {
    $decoded = verifyToken();

    // Chuyển về mảng nếu là chuỗi
    if (!is_array($allowedRoles)) {
        $allowedRoles = [$allowedRoles];
    }

    if (!in_array($decoded->role, $allowedRoles)) {
        sendError('Forbidden: Insufficient permissions', 403);
    }

    return $decoded;
}
?>