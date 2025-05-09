<?php
$path = parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH);
$method = $_SERVER["REQUEST_METHOD"];

$url = "/LTW_ASS/backend/app/public";

require_once __DIR__ . '/../middleware/Cors.php';

require_once __DIR__ . '/../controllers/AdminController.php';
require_once __DIR__ . '/../controllers/AuthController.php';
require_once __DIR__ . '/../controllers/UserController.php';
require_once __DIR__ . '/../controllers/GuestController.php';
require_once __DIR__ . '/../controllers/QuestionController.php';
require_once __DIR__ . '/../controllers/AnswerController.php';
require_once __DIR__ . '/../controllers/ProductController.php';

if ($path === $url . '/login' && $method === 'POST') {
    login();
} elseif ($path === $url . '/auth' && $method === 'GET') {
    auth();
} elseif ($path === $url . '/register' && $method === 'POST') {
    register();
} elseif ($path === $url . '/logout' && $method === 'POST') {
    logout();
} elseif ($path === $url . '/profile' && $method === 'GET') {
    profile();
} elseif ($path === $url . '/profile' && $method === 'POST') {
    updateProfile();
} elseif ($path === $url . '/profile/reset' && $method === 'POST') {
    changePassword();
} elseif ($path === $url . '/admin/login' && $method === 'POST') {
    adminLogin();
} elseif ($path === $url . '/admin/register' && $method === 'POST') {
    adminRegister();
} elseif ($path === $url . '/admin/profile' && $method === 'GET') {
    adminProfile();
} elseif ($path === $url . '/admin/contact' && $method === 'GET') {
    getAllContacts();
} elseif ($path === $url . '/admin/users' && $method === 'GET') {
    getAllUsers();
} elseif ($path === $url . '/admin/users' && $method === 'DELETE') {
    $data = json_decode(file_get_contents("php://input"), true);
    $id = $data['id'] ?? '';
    if ($id) {
        deleteUserById($id);
    }
} elseif ($method === 'POST' && preg_match('#^' . preg_quote($url, '#') . '/admin/contact/(\d+)$#', $path, $matches)) {
    $id = (int)$matches[1];
    if ($id > 0) {
        updateContactStatus($id);
    } else {
        http_response_code(400);
        echo json_encode(['message' => 'Invalid ID']);
    }
} elseif ($method === 'DELETE' && preg_match('#^' . preg_quote($url, '#') . '/admin/contact/(\d+)$#', $path, $matches)) {
    $id = (int)$matches[1];
    if ($id > 0) {
        deleteContact($id);
    } else {
        http_response_code(400);
        echo json_encode(['message' => 'Invalid ID']);
    }
} elseif ($path === $url . '/contact' && $method === 'POST') {
    sendContactForm();
} elseif ($path === $url . '/get-10-questions' && $method === 'GET') {
    getQuestions();
} elseif ($path === $url . '/get-all-questions' && $method === 'GET') {
    getAllQuestions();
} elseif ($path === $url . '/count' && $method === 'GET') {
    getNumberQuesions();
} elseif ($path === $url . '/create-question' && $method === 'POST') {
    createQuestion();
} elseif ($path === $url . '/update-question' && $method === 'POST') {
    updateQuestion();
} elseif ($path === $url . '/delete-question' && $method === 'GET') {
    deleteQuestion();
} elseif ($path === $url . '/get-answers' && $method === 'GET') {
    getAnswersByQuestionId();
} elseif ($path === $url . '/create-answer' && $method === 'POST') {
    createAnswer();
} elseif ($path === $url . '/update-answer' && $method === 'POST') {
    updateAnswer();
} elseif ($path === $url . '/delete-answer' && $method === 'GET') {
    deleteAnswerById();
} elseif ($path === $url . '/missions' && $method === 'GET') {
    getMission();
} elseif ($path === $url . '/missions' && $method === 'POST') {
    updateMission();
} elseif ($path === $url . '/missions/add' && $method === 'POST') {
    addMission();
} elseif ($path === $url . '/missions/delete' && $method === 'DELETE') {
    deleteMission();
} elseif ($path === $url . '/menu-items' && $method === 'GET') {
    getMenuItems();
} elseif ($path === $url . '/sub-menu-items' && $method === 'GET') {
    getSubMenuItems();
} elseif ($path === $url . '/products' && $method === 'GET') {
    getProducts();
} elseif ($method === 'GET' && preg_match('#^' . preg_quote($url, '#') . '/products/(\d+)$#', $path, $matches)) {
    $id = (int)$matches[1];
    getProductById($id);
} elseif ($path === $url . '/products' && $method === 'POST') {
    addProduct();
} elseif ($method === 'POST' && preg_match('#^' . preg_quote($url, '#') . '/products/(\d+)$#', $path, $matches)) {
    $id = (int)$matches[1];
    updateProduct($id);
} elseif ($method === 'DELETE' && preg_match('#^' . preg_quote($url, '#') . '/products/(\d+)$#', $path, $matches)) {
    $id = (int)$matches[1];
    deleteProduct($id);
} elseif ($path === $url . '/orders' && $method === 'POST') {
    createOrder();
} elseif ($path === $url . '/orders' && $method === 'GET') {
    getOrders();
} else {
    http_response_code(404);
    echo json_encode(['message' => 'Not Found ' . $path . ' ' . $method]);
}
?>