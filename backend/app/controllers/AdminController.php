<?php

require_once __DIR__ . '/../models/contactFormModel.php';

function adminProfile()
{
    $admin = getUserFromToken();
    if (!$admin) {
        // response_json(['message' => 'Token không hợp lệ hoặc không tồn tại'], 401);
        return;
    }

    $data = AdminModel::findAdminById($admin->id);

    if (!$data) {
        response_json(['message' => 'Admin không tồn tại'], 404);
        return;
    }

    response_json([
        'message' => 'Get profile success',
        'data' => [
            'user' => $data,
            'admin' => $admin,
        ]
    ], 200);
}

function getAllContacts() {
    $admin = getUserFromToken();
    if (!$admin) {
        response_json(['message' => 'Token không hợp lệ hoặc không tồn tại'], 401);
        return;
    }

    $contacts = contactFormModel::getAllContactForms();

    if (!$contacts) {
        response_json(['message' => 'Không có liên hệ nào'], 404);
        return;
    }

    response_json([
        'message' => 'Get all contacts success',
        'data' => $contacts,
    ], 200);
}

?>