<?php

require_once __DIR__ . '/../models/contactFormModel.php';
require_once __DIR__ . '/../models/MissionModel.php';

function adminProfile()
{
    $admin = getUserFromToken();
    if (!$admin || $admin->role != 'admin') {
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

function getAllUsers() {
    $admin = getUserFromToken();
    if (!$admin || $admin->role != 'admin') {
        response_json(['message' => 'Token không hợp lệ hoặc không tồn tại'], 401);
        return;
    }

    $users = UserModel::getAllUsers();

    if (!$users) {
        response_json([
            'message' => 'Get all users success',
            'data' => [],
        ], 200);
        return;
    }

    response_json([
        'message' => 'Get all users success',
        'data' => $users,
    ], 200);
}

function deleteUserById($id) {
    $admin = getUserFromToken();
    if (!$admin || $admin->role != 'admin') {
        response_json(['message' => 'Token không hợp lệ hoặc không tồn tại'], 401);
        return;
    }

    $user = UserModel::findUserById($id);

    if (!$user) {
        response_json(['message' => 'User không tồn tại'], 404);
        return;
    }

    if (UserModel::deleteUser($id)) {
        response_json(['message' => 'Xóa user thành công'], 200);
    }
    else {
        response_json(['message' => 'Xóa user thất bại'], 500);
    }

}

function getAllContacts() {
    $admin = getUserFromToken();
    if (!$admin || $admin->role != 'admin') {
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
    if (!$admin || $admin->role != 'admin') {
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
    if (!$admin || $admin->role != 'admin') {
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

function updateMission() {
    $admin = getUserFromToken();
    if (!$admin || $admin->role != 'admin') {
        response_json(['message' => 'Token không hợp lệ hoặc không tồn tại'], 401);
        return;
    }

    $data = json_decode(file_get_contents("php://input"), true);
    $id = $data['id'] ?? '';
    $title = $data['title'] ?? '';
    $description = $data['description'] ?? '';
    $icon = $data['icon'] ?? '';

    if (!$id) {
        response_json(['message' => 'ID sứ mệnh không hợp lệ'], 400);
        return;
    }

    $mission = MissionModel::findMissionById($id);

    if (!$mission) {
        response_json(['message' => 'Sứ mệnh không tồn tại'], 404);
        return;
    }

    $updatedMess = MissionModel::updateMission($id, $title, $description, $icon);

    if (!$updatedMess) {
        response_json(['message' => 'Cập nhật sứ mệnh thất bại'], 500);
        return;
    }

    response_json([
        'message' => 'Cập nhật sứ mệnh thành công',
        'data' => [
            'id' => $id,
            'title' => $title,
            'description' => $description,
            'icon' => $icon,
        ]
    ], 200);
}

function addMission() {
    $admin = getUserFromToken();
    if (!$admin || $admin->role != 'admin') {
        response_json(['message' => 'Token không hợp lệ hoặc không tồn tại'], 401);
        return;
    }

    $data = json_decode(file_get_contents("php://input"), true);
    $title = $data['title'] ?? '';
    $description = $data['description'] ?? '';
    $icon = $data['icon'] ?? '';

    if (!$title || !$description) {
        response_json(['message' => 'Thông tin sứ mệnh không hợp lệ'], 400);
        return;
    }

    $addMess = MissionModel::addMission($title, $description, $icon);

    if (!$addMess) {
        response_json(['message' => 'Thêm sứ mệnh thất bại'], 500);
        return;
    }

    $mission = MissionModel::findMissionByName($title);

    response_json([
        'message' => 'Thêm sứ mệnh thành công',
        'data' => [
            'title' => $title,
            'description' => $description,
            'icon' => $icon,
            'id' => $mission['id'],
        ]
    ], 200);
}

function deleteMission() {
    $admin = getUserFromToken();
    if (!$admin || $admin->role != 'admin') {
        response_json(['message' => 'Token không hợp lệ hoặc không tồn tại'], 401);
        return;
    }

    $data = json_decode(file_get_contents("php://input"), true);
    $id = $data['id'] ?? '';

    if (!$id) {
        response_json(['message' => 'ID sứ mệnh không hợp lệ'], 400);
        return;
    }

    $mission = MissionModel::findMissionById($id);

    if (!$mission) {
        response_json(['message' => 'Sứ mệnh không tồn tại'], 404);
        return;
    }

    $deletedMess = MissionModel::deleteMission($id);

    if (!$deletedMess) {
        response_json(['message' => 'Xóa sứ mệnh thất bại'], 500);
        return;
    }

    response_json([
        'message' => 'Xóa sứ mệnh thành công',
        'data' => [
            'id' => $id,
        ]
    ], 200);
}

?>