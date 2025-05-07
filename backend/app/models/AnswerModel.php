<?php
require_once __DIR__ . '/../config/database.php';

class AnswerModel{
    public static function getNumberAnswersByQuestionId($question_id){
        global $conn;
        $count_sql = "SELECT COUNT(*) AS answer_count FROM answer WHERE question_id = ?";
        $count_stmt = $conn->prepare($count_sql);
        $count_stmt->bind_param("i", $question_id);
        $count_stmt->execute();
        return $count_stmt->get_result();
    }

    public static function getAllAnswerByQuestionId($question_id){
        global $conn;
        $sql = "SELECT * FROM answer WHERE question_id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $question_id);
        $stmt->execute();
        return $stmt->get_result();
    }

    public static function createAnswer($question_id, $user_id, $content, $create_at, $update_at){
        global $conn;
        $sql = "INSERT INTO answer(question_id, user_id, content, create_at, update_at) VALUES (?,?,?,?,?);";

        $stmt = $conn->prepare($sql);
        if($stmt == false){
            return json_encode([
                "status" => "error",
                "message" => "Prepare failed: " . $conn->error
            ]);
        }

        $stmt->bind_param("iisss",$question_id, $user_id, $content, $create_at, $update_at);

        if ($stmt->execute()) {
            $stmt->close();
            echo json_encode([
                "status" => "success",
                "message" => "Answer created successfully"
            ]);
        } else {
            $error = $stmt->error;
            $stmt->close();
            return json_encode([
                "status" => "error",
                "message" => "Execute failed: " . $error
            ]);
        }
    }

    public static function updateAnswer($answer_id, $content, $update_at){
        global $conn;
        $sql = "UPDATE answer SET content = ?, update_at = ? WHERE answer_id = ?";

        $stmt = $conn->prepare($sql);
        if($stmt == false){
            return json_encode([
                "status" => "error",
                "message" => "Prepare failed: " . $conn->error
            ]);
        }

        $stmt->bind_param("ssi",$content, $update_at, $answer_id);

        if ($stmt->execute()) {
            $stmt->close();
            echo json_encode([
                "status" => "success",
                "message" => "Answer updated successfully"
            ]);
        } else {
            $error = $stmt->error;
            $stmt->close();
            return json_encode([
                "status" => "error",
                "message" => "Execute failed: " . $error
            ]);
        }
    }

    public static function deleteAnswerById($answer_id){
        global $conn;
        $sql = "DELETE FROM answer WHERE answer_id = ?";

        $stmt = $conn->prepare($sql);

        if($stmt == false){
            return json_encode([
                "status" => "error",
                "message" => "Prepare failed: " . $conn->error
            ]);
        }

        $stmt->bind_param("i",$answer_id);

        if ($stmt->execute()) {
            $stmt->close();
            echo json_encode([
                "status" => "success",
                "message" => "Answer deleted successfully"
            ]);
        } else {
            $error = $stmt->error;
            $stmt->close();
            return json_encode([
                "status" => "error",
                "message" => "Execute failed: " . $error
            ]);
        }
    }
}
?>