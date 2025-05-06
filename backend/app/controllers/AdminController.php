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
        response_json([
            'message' => 'Get all contacts success',
            'data' => [],
        ], 200);
        return;
    }

    response_json([
        'message' => 'Get all contacts success',
        'data' => $contacts,
    ], 200);
}

function updateContactStatus($id) {
    $admin = getUserFromToken();
    if (!$admin) {
        response_json(['message' => 'Token không hợp lệ hoặc không tồn tại'], 401);
        return;
    }

    $contact = contactFormModel::getContactForm($id);

    if (!$contact) {
        response_json(['message' => 'Liên hệ không tồn tại'], 404);
        return;
    }

    $data = json_decode(file_get_contents("php://input"), true);
    $status = $data['status'] ?? '';

    if ($status !== 'Chưa xử lý' && $status !== 'Đã xử lý') {
        response_json(['message' => 'Trạng thái không hợp lệ'], 400);
        return;
    }

    $updatedMess = contactFormModel::updateContactForm($id, $status);

    if (!$updatedMess) {
        response_json(['message' => 'Cập nhật trạng thái liên hệ thất bại'], 500);
        return;
    }

    response_json([
        'message' => 'Cập nhật trạng thái liên hệ thành công',
        'data' => [
            'id' => $id,
            'status' => $status,
        ]
    ], 200);
}

function deleteContact($id) {
    $admin = getUserFromToken();
    if (!$admin) {
        response_json(['message' => 'Token không hợp lệ hoặc không tồn tại'], 401);
        return;
    }

    $contact = contactFormModel::getContactForm($id);

    if (!$contact) {
        response_json(['message' => 'Liên hệ không tồn tại'], 404);
        return;
    }

    $deletedMess = contactFormModel::deleteContactFormById($id);

    if (!$deletedMess) {
        response_json(['message' => 'Xóa liên hệ thất bại'], 500);
        return;
    }

    response_json([
        'message' => 'Xóa liên hệ thành công',
        'data' => [
            'id' => $id,
        ]
    ], 200);
}

?>