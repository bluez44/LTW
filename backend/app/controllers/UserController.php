<?php
require_once __DIR__ . '/../models/UserModel.php';

function profile()
{
    $user = getUserFromToken();
    if (!$user) {
        response_json(['message' => 'Token không hợp lệ hoặc không tồn tại'], 401);
        return;
    }

    $data = UserModel::findUserById($user->id);

    response_json([
        'message' => 'Get profile success',
        'data' => [
            'user' => $data,
            'test' => $user
        ]
    ], 200);
}

function updateProfile() {
    $user = getUserFromToken();
    if (!$user) {
        response_json(['message' => 'Token không hợp lệ hoặc không tồn tại'], 401);
        return;
    }
    $targetDir = __DIR__ . '/../uploads/';

    $id = $_POST['id'] ?? '';
    $email = $_POST['email'] ?? '';
    $user_name = $_POST['user_name'] ?? '';
    $password = $_POST['password'] ?? '';
    $first_name = $_POST['first_name'] ?? '';
    $last_name = $_POST['last_name'] ?? '';
    $phone_number = $_POST['phone_number'] ?? '';
    $birth_day = $_POST['birth_day'] ?? '';
    $avatarUrl = $_POST['avatar_url'] ?? '';

    // Xử lý upload file
    $file = $_FILES['avatar'] ?? '';

    if($file['name'] != '') {
        $uploadDir = '/LTW_ASS/backend/app/uploads/';
        $filename = uniqid() . "_" . basename($file["name"]);
        $targetFile = $targetDir . $filename;
        $avatarUrl = $uploadDir . $filename;

        $fileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));
        $allowedTypes = ['jpg', 'jpeg', 'png', 'gif'];
        if (!in_array($fileType, $allowedTypes)) {
            response_json(['message' => 'Định dạng ảnh không phù hợp', 'data' => $file], 500);
            return;
        }
    }

    if (!UserModel::findUserByUserName($email)) {
        response_json([
            'message' => 'Người dùng không tồn tại'
        ], 500);
    } else {
        if (UserModel::updateUser($id, $email, $user_name, $password, $first_name, $last_name, $phone_number, $birth_day, $avatarUrl)) {
            
            if($file['name'] != '') {
                if (!move_uploaded_file($file["tmp_name"], $targetFile)) {
                    response_json(['message' => 'Lỗi upload file'], 500);
                    return;
                }
            }

            response_json(['message' => 'Cập nhật thông tin thành công', 'data' => $avatarUrl], 201);
        } else {
            response_json(['message' => 'Cập nhật thông tin thất bại'], 500);
        }
    }
}

function changePassword() {
    $user = getUserFromToken();
    if (!$user) {
        response_json(['message' => 'Token không hợp lệ hoặc không tồn tại'], 401);
        return;
    }

    $id = $user->id;

    $data = json_decode(file_get_contents("php://input"), true);

    $oldPassword = $data['current_pass'] ?? '';
    $newPassword = $data['new_pass'] ?? '';

    if(UserModel::checkPassword($id, $oldPassword)) {
        if(UserModel::changePassword($id, $newPassword)) {
            response_json(['message' => 'Đổi mật khẩu thành công'], 200);
        } else {
            response_json(['message' => 'Đổi mật khẩu thất bại'], 500);
        }
    } else {
        response_json(['message' => 'Mật khẩu không đúng'], 500);        
    }
}

?>