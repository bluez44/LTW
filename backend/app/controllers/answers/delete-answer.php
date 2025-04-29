<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

    if($_SERVER['REQUEST_METHOD'] === 'DELETE'){
        include("../../config/config.php");

        $answer_id = isset($_GET["answer_id"]) ? intval($_GET["answer_id"]) : 0;

        $sql = "DELETE FROM answer WHERE answer_id = '$answer_id'";

        if (mysqli_query($connect, $sql)) {
            echo json_encode([
                "status" => "success",
                "message" => "Answer deleted successfully"
            ]);
        } else {
            echo json_encode([
                "status" => "error",
                "message" => "Failed to delete answer: " . mysqli_error($connect)
            ]);
        }
    }
?>
