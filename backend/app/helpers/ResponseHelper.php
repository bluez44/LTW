<?php
function response_json($data = [], $status = 200) {
    http_response_code($status);
    echo json_encode([
        'status' => $status,
        'success' => $status >= 200 && $status < 300,
        'message' => $data['message'] ?? '',
        'data' => $data['data'] ?? null
    ]);
    exit;
}
?>