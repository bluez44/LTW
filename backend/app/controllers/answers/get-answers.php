<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

    if($_SERVER['REQUEST_METHOD'] === 'GET'){
        include("../../config/config.php");

        $question_id = isset($_GET["question_id"]) ? intval($_GET["question_id"]) : 0;

        $sql = "SELECT * FROM answer WHERE question_id = '$question_id'";
        $result = mysqli_query($connect, $sql);
        $res = [];

        while($row = mysqli_fetch_assoc($result)){
            $account_id = $row["account_id"];

            $user_sql = "SELECT first_name, last_name FROM user WHERE account_id = '$account_id'";
            $user_result = mysqli_query($connect, $user_sql);
            $userInfo = mysqli_fetch_assoc($user_result);

            $row["first_name"] = $userInfo["first_name"] ?? null;
            $row["last_name"] = $userInfo["last_name"] ?? null;

            $res[] = $row;
        }

        echo json_encode($res);
    }
?>
