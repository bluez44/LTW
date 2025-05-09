<?php
require_once __DIR__ . '/../models/GuestModel.php';
require_once __DIR__ . '/../models/UserModel.php';


function sendContactForm(){
    $data = json_decode(file_get_contents("php://input"), true);
    $full_name = $data['full_name'] ?? '';
    $email = $data['email'] ?? '';
    $phoneNo = $data['phoneNo'] ?? '';
    $content = $data['content'] ?? '';
    $created_at = $data['created_at'] ?? date('Y-m-d H:i:s');

    $res = GuestModel::sendContactForm($full_name, $email, $phoneNo, $content, $created_at);

    if ($res) {
        response_json([
            'message' => 'Hệ thống đã ghi nhận thông tin của bạn. Chúng tôi sẽ liên hệ lại với bạn trong thời gian sớm nhất!',
        ], 200);
    } else {
        response_json(([
            'message' => 'Gửi thông tin thất bại',
            'data' => $res
        ]), 500);
    }
}

function getMission() {
    $missions = GuestModel::getAllMissions();

    if(!$missions) {
        response_json([
            'message' => 'Không tìm thấy danh sách'
        ], 404);
    }

    response_json([
        'data' => $missions,
        'message' => 'Lấy danh sứ mệnh thành công'
    ], 200);
}

function getMenuItems() {
    $menuItems = GuestModel::getAllMenuItems();

    if(!$menuItems) {
        response_json([
            'message' => 'Không tìm thấy danh sách'
        ], 404);
    }

    response_json([
        'data' => $menuItems,
        'message' => 'Lấy danh sách menu thành công'
    ], 200);
}

function getSubMenuItems() {
    $subMenuItems = GuestModel::getAllSubMenuItems();

    if(!$subMenuItems) {
        response_json([
            'message' => 'Không tìm thấy danh sách'
        ], 404);
    }

    response_json([
        'data' => $subMenuItems,
        'message' => 'Lấy danh sách sub menu thành công'
    ], 200);
}

?>