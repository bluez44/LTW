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

?>