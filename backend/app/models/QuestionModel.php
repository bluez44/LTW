<?php
require_once __DIR__ . '/../config/database.php';

class QuestionModel{
    public static function get10Questions($offset, $limit, $search){
        global $conn;


        $sql = "SELECT * FROM question 
            WHERE title LIKE ? 
            ORDER BY create_at DESC 
            LIMIT ?, ?";
        $stmt = $conn->prepare($sql);
        $likeSearch = "%$search%";
        $stmt->bind_param("sii", $likeSearch, $offset, $limit);
        $stmt->execute();
        return $stmt->get_result();
    }

    public static function getAllQuestions(){
        global $conn;


        $sql = "SELECT * FROM question 
            ORDER BY create_at DESC";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        return $stmt->get_result();
    }

    public static function getNumberQuestionWithSearch($search) {
        global $conn;
        if (!empty($search)) {
            $sql = "SELECT COUNT(*) as count_row 
                    FROM question 
                    WHERE content LIKE ? OR title LIKE ?";
            $stmt = $conn->prepare($sql);
            $likeSearch = "%$search%";
            $stmt->bind_param("ss", $likeSearch, $likeSearch);
        } else {
            $sql = "SELECT COUNT(*) as count_row FROM question";
            $stmt = $conn->prepare($sql);
        }

        $stmt->execute();
        return $stmt->get_result();
    }

    public static function getAllQuestionWithSearch($search){
        global $conn;
        if (!empty($search)) {
            $sql = "SELECT * FROM question 
                    WHERE content LIKE ? OR title LIKE ?";
            $stmt = $conn->prepare($sql);
            $likeSearch = "%$search%";
            $stmt->bind_param("ss", $likeSearch, $likeSearch);
        } else {
            $sql = "SELECT * FROM question";
            $stmt = $conn->prepare($sql);
        }

        $stmt->execute();
        return $stmt->get_result();
    }

    public static function createQuestion($user_id, $title, $content, $create_at, $update_at){
        global $conn;

        $sql = "INSERT INTO question (user_id, title, content, create_at, update_at) 
            VALUES (?, ?, ?, ?, ?)";
    
        $stmt = $conn->prepare($sql);
        if ($stmt === false) {
            return json_encode([
                "status" => "error",
                "message" => "Prepare failed: " . $conn->error
            ]);
        }

        $stmt->bind_param("issss", $user_id, $title, $content, $create_at, $update_at);

        if ($stmt->execute()) {
            $stmt->close();
            return json_encode([
                "status" => "success",
                "message" => "Question created successfully"
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

    public static function updateQuestion($question_id, $title, $content, $update_at){
        global $conn;

        $sql = "UPDATE question SET title = ?, content = ?, update_at = ? WHERE question_id = ?";
    
        $stmt = $conn->prepare($sql);
        if ($stmt === false) {
            return json_encode([
                "status" => "error",
                "message" => "Prepare failed: " . $conn->error
            ]);
        }

        $stmt->bind_param("sssi", $title, $content, $update_at, $question_id);

        if ($stmt->execute()) {
            $stmt->close();
            return json_encode([
                "status" => "success",
                "message" => "Question updated successfully"
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

    public static function deleteQuestionById($question_id){
        global $conn;
        $sql = "DELETE FROM question WHERE question_id = ?";

        $stmt = $conn->prepare($sql);

        if($stmt == false){
            return json_encode([
                "status" => "error",
                "message" => "Prepare failed: " . $conn->error
            ]);
        }

        $stmt->bind_param("i", $question_id);

        if ($stmt->execute()) {
            $stmt->close();
            return json_encode([
                "status" => "success",
                "message" => "Question deleted successfully"
            ]);
        } else {
            $error = $stmt->error;
            $stmt->close();
            return json_encode([
                "status" => "error",
                "message" => "Error deleting question: " . $error
            ]);
        }
    }
}
?>