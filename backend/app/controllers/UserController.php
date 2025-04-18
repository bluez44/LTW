<?php
require_once __DIR__ . '/../models/UserModel.php';

function profile()
{
    $user = getUserFromToken();
    if (!$user) {
        // response_json(['message' => 'Token không hợp lệ hoặc không tồn tại'], 401);
        return;
    }

    $data = UserModel::findUserById($user->id);

    response_json([
        'message' => 'Get profile success',
        'data' => [
            'user' => $data,
        ]
    ], 200);
}

?>