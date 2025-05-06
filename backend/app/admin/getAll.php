<?php 
require_once __DIR__ . '/../middleware/checkRole.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../utils/response.php';

checkRole('admin');

$sql = "
    SELECT 
        A.id AS account_id, 
        A.role, 
        U.user_name, 
        U.first_name, 
        U.last_name, 
        U.email
    FROM Account A
    JOIN User U ON A.id = U.account_id

    UNION

    SELECT 
        A.id AS account_id, 
        A.role, 
        AD.user_name, 
        AD.first_name, 
        AD.last_name, 
        NULL AS email
    FROM Account A
    JOIN Admin AD ON A.id = AD.account_id
";

$result = $conn->query($sql);
$users = [];
while ($row = $result->fetch_assoc()) {
    $users[] = $row;
}
sendResponse($users);
?>