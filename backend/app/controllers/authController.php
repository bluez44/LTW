<?php
require_once __DIR__ . '/../models/UserModel.php';
require_once __DIR__ . '/../helpers/ResponseHelper.php';
require_once __DIR__ . '/../helpers/GetUserFromToken.php';
require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../config/env.php';
$env = loadEnv();
$JWT_SECRET = $env['JWT_SECRET'];


use Firebase\JWT\JWT;
use Firebase\JWT\Key;


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

function register()
{
    $data = json_decode(file_get_contents("php://input"), true);
    $email = $data['email'] ?? '';
    $user_name = $data['user_name'] ?? '';
    $password = $data['password'] ?? '';
    $first_name = $data['first_name'] ?? '';
    $last_name = $data['last_name'] ?? '';
    $phone_number = $data['phone_number'] ?? '';
    $birth_day = $data['birth_day'] ?? '';
    if (UserModel::findUserByUserName($email)) {
        response_json([
            'message' => 'Mail đã được sử dụng! Vui lòng sử dụng email khác'
        ], 409);
    } else {
        if (UserModel::createUser($email, $user_name, $password, $first_name, $last_name, $phone_number, $birth_day)) {
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
        ]
    ], 200);
}

