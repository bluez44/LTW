<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

if ($_SERVER["REQUEST_METHOD"] === "GET") {
    include("../../config/config.php");

    $offset = isset($_GET["offset"]) ? intval($_GET["offset"]) : 0;
    $limit = isset($_GET["limit"]) ? intval($_GET["limit"]) : 10;
    $filter = isset($_GET["filter"]) ? $_GET["filter"] : "all";
    $search = isset($_GET["search"]) ? $_GET["search"] : "";

    if(!empty($search)){
        $sql = "SELECT * FROM question
                WHERE content LIKE '%$search%' OR title LIKE '%$search%'
                ORDER BY create_at DESC 
                LIMIT $limit OFFSET $offset";
    }else{
        $sql = "SELECT * FROM question 
                ORDER BY create_at DESC 
                LIMIT $limit OFFSET $offset";
    }
    $result = mysqli_query($connect, $sql);

    if (mysqli_num_rows($result) > 0) {
        $res = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $question_id = $row["question_id"];
            $account_id = $row["account_id"];

            $count_sql = "SELECT COUNT(*) AS answer_count FROM answer 
                            WHERE question_id = '$question_id'";
            $count_result = mysqli_query($connect, $count_sql);
            $count_row = mysqli_fetch_assoc($count_result);

            
            if($filter == "unanswer"){
                if($count_row["answer_count"] > 0){
                    continue;
                }
            }else if($filter == "answered"){
                if($count_row["answer_count"] == 0){
                    continue;
                }
            }

            $row["answer_count"] = $count_row ? $count_row["answer_count"] : 0;
            $user_sql = "SELECT first_name, last_name FROM user WHERE account_id = '$account_id'";
            $user_result = mysqli_query($connect, $user_sql);
            $user_row = mysqli_fetch_assoc($user_result);
            $row["first_name"] = $user_row ? $user_row["first_name"] : null;
            $row["last_name"] = $user_row ? $user_row["last_name"] : null;

            $res[] = $row;
        }

        echo json_encode($res);
    } else {
        echo json_encode([]);
    }
}
?>
