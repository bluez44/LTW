<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

    if($_SERVER['REQUEST_METHOD'] === 'DELETE'){
        include("../../config/config.php");

        $question_id = isset($_GET["question_id"]) ? intval($_GET["question_id"]) : 0;

        $sql = "DELETE FROM question WHERE question_id = '$question_id'";

        if (mysqli_query($connect, $sql)) {
            echo json_encode([
                "status" => "success",
                "message" => "Question deleted successfully"
            ]);
        } else {
            echo json_encode([
                "status" => "error",
                "message" => "Question to delete answer: " . mysqli_error($connect)
            ]);
        }
    }
?>
