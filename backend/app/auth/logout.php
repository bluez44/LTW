<?php
require_once __DIR__ . '/../utils/response.php';
sendResponse(['message' => 'User logged out (client should discard the token)']);
?>