<?php
require_once __DIR__ . '/../models/UserModel.php';
require_once __DIR__ . '/../models/AdminModel.php';
require_once __DIR__ . '/../helpers/ResponseHelper.php';
require_once __DIR__ . '/../helpers/GetUserFromToken.php';
require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../config/env.php';
$env = loadEnv();
$JWT_SECRET = $env['JWT_SECRET'];


use Firebase\JWT\JWT;


function login()
{
    global $JWT_SECRET;
    $data = json_decode(file_get_contents("php://input"), true);
    $userName = $data['username'] ?? '';
    $password = $data['password'] ?? '';

    $user = UserModel::findUserByUserName($userName);
    if ($user && password_verify($password, $user['password'])) {
        $payload = [
            'id' => $user['id'],
            'email' => $user['email'],
            'iat' => time(),
            'exp' => time() + (60 * 60 * 24)
        ];

        $jwt = JWT::encode($payload, $JWT_SECRET, 'HS256');

        setcookie(
            "token",        // tên cookie
            $jwt,           // giá trị
            time() + 86400, // thời gian sống 1 ngày
            "/",            // path
            "",    // domain (sửa cho đúng nếu deploy)
            false,          // true nếu dùng HTTPS
            true            // HttpOnly để JS không truy cập được
        );

        response_json([
            'message' => 'Đăng nhập thành công',
        ], 200);
    } else {
        response_json([
            'message' => 'Tài khoản hoặc mật khẩu không đúng',
        ], 401);
    }
}

function adminLogin()
{
    global $JWT_SECRET;
    $data = json_decode(file_get_contents("php://input"), true);
    $userName = $data['username'] ?? '';
    $password = $data['password'] ?? '';

    $user = AdminModel::findAdminByUserName($userName);
    if ($user && password_verify($password, $user['password'])) {
        $payload = [
            'id' => $user['id'],
            'iat' => time(),
            'exp' => time() + (60 * 60 * 24)
        ];

        $jwt = JWT::encode($payload, $JWT_SECRET, 'HS256');

        setcookie(
            "token",        // tên cookie
            $jwt,           // giá trị
            time() + 86400, // thời gian sống 1 ngày
            "/",            // path
            "",    // domain (sửa cho đúng nếu deploy)
            false,          // true nếu dùng HTTPS
            true            // HttpOnly để JS không truy cập được
        );

        response_json([
            'message' => 'Đăng nhập thành công',
        ], 200);
    } else {
        response_json([
            'message' => 'Tài khoản hoặc mật khẩu admin không đúng',
            'data' => $userName,
        ], 401);
    }
}

function register()
{
    $targetDir = __DIR__ . '/../uploads/';
    if (!is_dir($targetDir)) {
        mkdir($targetDir, 0777, true);
    }
    $email = $_POST['email'] ?? '';
    $user_name = $_POST['user_name'] ?? '';
    $password = $_POST['password'] ?? '';
    $first_name = $_POST['first_name'] ?? '';
    $last_name = $_POST['last_name'] ?? '';
    $phone_number = $_POST['phone_number'] ?? '';
    $birth_day = $_POST['birth_day'] ?? '';

    // Xử lý upload file
    $file = $_FILES['avatar'] ?? '';
    $uploadDir = '/LTW_ASS/backend/app/uploads/';
    $filename = uniqid() . "_" . basename($file["name"]);
    $targetFile = $targetDir . $filename;
    $avatarUrl = $uploadDir . $filename;

    $fileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));
    $allowedTypes = ['jpg', 'jpeg', 'png', 'gif'];

    if (UserModel::findUserByUserName($email)) {
        response_json([
            'message' => 'Mail đã được sử dụng! Vui lòng sử dụng email khác'
        ], 409);
    } else {
        if (!in_array($fileType, $allowedTypes)) {
            response_json(['message' => 'Định dạng ảnh không phù hợp'], 500);
            return;
        }

        
        if (UserModel::createUser($email, $user_name, $password, $first_name, $last_name, $phone_number, $birth_day, $avatarUrl)) {
            if (!move_uploaded_file($file["tmp_name"], $targetFile)) {
                response_json(['message' => 'Lỗi upload file'], 500);
                return;
            }
            response_json(['message' => 'Đăng ký thành công'], 201);
        } else {
            response_json(['message' => 'Đăng ký thất bại'], 500);
        }
    }
}

function adminRegister()
{
    $data = json_decode(file_get_contents("php://input"), true);
    $user_name = $data['user_name'] ?? '';
    $password = $data['password'] ?? '';
    $first_name = $data['first_name'] ?? '';
    $last_name = $data['last_name'] ?? '';
    if (AdminModel::findAdminByUserName($user_name)) {
        response_json([
            'message' => 'Mail đã được sử dụng! Vui lòng sử dụng email khác'
        ], 409);
    } else {
        if (AdminModel::createAdmin($user_name, $password, $first_name, $last_name)) {
            response_json(['message' => 'Đăng ký thành công'], 201);
        } else {
            response_json(['message' => 'Đăng ký thất bại'], 500);
        }
    }
}

function logout()
{
    setcookie("token", "", time() - 3600, "/");
    response_json(['message' => 'Đăng xuất thành công'], 200);
}

?>