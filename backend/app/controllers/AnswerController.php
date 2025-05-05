<?php
function getAnswersByQuestionId(){
    $question_id = isset($_GET["question_id"]) ? intval($_GET["question_id"]) : 0;

    $result = AnswerModel::getAllAnswerByQuestionId($question_id);

    $res = [];

    while ($row = $result->fetch_assoc()) {
        $account_id = $row["account_id"];

        $user_result = UserModel::getUserFullNameByAcountId($account_id);
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
    $account_id = isset($data["account_id"]) ? intval($data["account_id"]) : 0;
    $content = isset($data["content"]) ? $data["content"] : "";
    $create_at = date("Y-m-d H:i:s");
    $update_at = $create_at;

    echo AnswerModel::createAnswer($question_id, $account_id, $content, $create_at, $update_at);
}

function deleteAnswerById(){
    $answer_id = isset($_GET["answer_id"]) ? intval($_GET["answer_id"]) : 0;

    echo AnswerModel::deleteAnswerById($answer_id);
}
?>