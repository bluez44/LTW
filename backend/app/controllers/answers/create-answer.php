<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    if($_SERVER['REQUEST_METHOD'] === 'POST'){
        include("../../config/config.php");

        $data = json_decode(file_get_contents("php://input"), true);
        

        $question_id = isset($data["question_id"]) ? intval($data["question_id"]) : 0;
        $account_id = isset($data["account_id"]) ? intval($data["account_id"]) : 0;
        $content = isset($data["content"]) ? $data["content"] : "";
        $create_at = date("Y-m-d H:i:s");
        $update_at = $create_at;
        
        $sql = "INSERT INTO answer(question_id, account_id, content, create_at, update_at) VALUES ('$question_id', '$account_id','$content', '$create_at', '$update_at');";

        if (mysqli_query($connect, $sql)) {
            echo json_encode([
                "status" => "success",
                "message" => "Answer created successfully"
            ]);
        } else {
            echo json_encode([
                "status" => "error",
                "message" => "Error: " . mysqli_error($connect)
            ]);
        }
    }
?>