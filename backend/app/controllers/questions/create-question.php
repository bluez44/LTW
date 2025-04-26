<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        include("../../config/config.php");

        $data = json_decode(file_get_contents("php://input"), true);
        

        $account_id = isset($data["account_id"]) ? intval($data["account_id"]) : 0;
        $title = isset($data["title"]) ? $data["title"] : "";
        $content = isset($data["content"]) ? $data["content"] : "";
        $create_at = date("Y-m-d H:i:s");
        $update_at = $create_at;

        $sql = "INSERT INTO question (account_id, title, content, create_at, update_at) 
                VALUES ('$account_id', '$title', '$content', '$create_at', '$update_at')";

        if (mysqli_query($connect, $sql)) {
            echo json_encode([
                "status" => "success",
                "message" => "Question created successfully"
            ]);
        } else {
            echo json_encode([
                "status" => "error",
                "message" => "Error: " . mysqli_error($connect)
            ]);
        }
    }
?>
