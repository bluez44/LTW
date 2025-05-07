<?php
function getAnswersByQuestionId(){
    $question_id = isset($_GET["question_id"]) ? intval($_GET["question_id"]) : 0;

    $result = AnswerModel::getAllAnswerByQuestionId($question_id);

    $res = [];

    while ($row = $result->fetch_assoc()) {
        $user_id = $row["user_id"];

        $user_result = UserModel::getUserFullNameByUserId($user_id);
        $userInfo = $user_result->fetch_assoc();

        $row["first_name"] = $userInfo["first_name"] ?? null;
        $row["last_name"] = $userInfo["last_name"] ?? null;

        $res[] = $row;
    }

    echo json_encode($res);
}

function createAnswer(){
    $data = json_decode(file_get_contents("php://input"), true);
        

    $question_id = isset($data["question_id"]) ? intval($data["question_id"]) : 0;
    $user_id = isset($data["user_id"]) ? intval($data["user_id"]) : 0;
    $content = isset($data["content"]) ? $data["content"] : "";
    $create_at = date("Y-m-d H:i:s");
    $update_at = $create_at;

    echo AnswerModel::createAnswer($question_id, $user_id, $content, $create_at, $update_at);
}

function updateAnswer(){
    $data = json_decode(file_get_contents("php://input"), true);
    
    $answer_id = isset($data["answer_id"]) ? intval($data["answer_id"]) : 0;
    $content = isset($data["content"]) ? $data["content"] : "";
    $update_at = date("Y-m-d H:i:s");

    echo AnswerModel::updateAnswer($answer_id, $content, $update_at);
}

function deleteAnswerById(){
    $answer_id = isset($_GET["answer_id"]) ? intval($_GET["answer_id"]) : 0;

    echo AnswerModel::deleteAnswerById($answer_id);
}
?>