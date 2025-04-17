<?php

function adminProfile()
{
    $admin = getUserFromToken();
    if (!$admin) {
        // response_json(['message' => 'Token không hợp lệ hoặc không tồn tại'], 401);
        return;
    }

    $data = AdminModel::findAdminById($admin->id);

    response_json([
        'message' => 'Get profile success',
        'data' => [
            'user' => $data,
        ]
    ], 200);
}

?>