<?php

require_once __DIR__ . '/../models/AnswerModel.php';
require_once __DIR__ . '/../models/QuestionModel.php';
function getAllQuestions() {
    // Search SQL
    $result = QuestionModel::getAllQuestions();

    if ($result->num_rows > 0) {
        $res = [];

        while ($row = $result->fetch_assoc()) {
            $question_id = $row["question_id"];
            $user_id = $row["user_id"];

            // Count answer
            $count_result = AnswerModel::getNumberAnswersByQuestionId($question_id);
            $count_row = $count_result->fetch_assoc();

            $row["answer_count"] = $count_row ? $count_row["answer_count"] : 0;

            // Get user
            $user_result = UserModel::getUserFullNameByUserId($user_id);
            $user_row = $user_result->fetch_assoc();

            $row["first_name"] = $user_row ? $user_row["first_name"] : null;
            $row["last_name"] = $user_row ? $user_row["last_name"] : null;

            $res[] = $row;
        }

        echo json_encode($res);
    } else {
        echo json_encode([]);
    }
}

function getQuestions() {
    $offset = isset($_GET["offset"]) ? intval($_GET["offset"]) : 0;
    $limit = isset($_GET["limit"]) ? intval($_GET["limit"]) : 10;
    $filter = isset($_GET["filter"]) ? $_GET["filter"] : "all";
    $search = isset($_GET["search"]) ? $_GET["search"] : "";

    // Search SQL
    $result = QuestionModel::get10Questions($offset, $limit, $search);

    if ($result->num_rows > 0) {
        $res = [];

        while ($row = $result->fetch_assoc()) {
            $question_id = $row["question_id"];
            $user_id = $row["user_id"];

            // Count answer
            $count_result = AnswerModel::getNumberAnswersByQuestionId($question_id);
            $count_row = $count_result->fetch_assoc();

            if ($filter == "unanswer" && $count_row["answer_count"] > 0) {
                continue;
            } elseif ($filter == "answered" && $count_row["answer_count"] == 0) {
                continue;
            }

            $row["answer_count"] = $count_row ? $count_row["answer_count"] : 0;

            // Get user
            $user_result = UserModel::getUserFullNameByUserId($user_id);
            $user_row = $user_result->fetch_assoc();

            $row["first_name"] = $user_row ? $user_row["first_name"] : null;
            $row["last_name"] = $user_row ? $user_row["last_name"] : null;

            $res[] = $row;
        }

        echo json_encode($res);
    } else {
        echo json_encode([]);
    }
}


function getNumberQuesions(){
    $filter = isset($_GET["filter"]) ? $_GET["filter"] : "all";
    $search = isset($_GET["search"]) ? $_GET["search"] : "";

    if ($filter == "all") {
        $result = QuestionModel::getNumberQuestionWithSearch($search);
        $count_row = $result->fetch_assoc();
        echo $count_row["count_row"];
    } else {
        $result = QuestionModel::getAllQuestionWithSearch($search);
        $count = [];

        while ($row = $result->fetch_assoc()) {
            $question_id = $row["question_id"];
            $res2 = AnswerModel::getNumberAnswersByQuestionId($question_id);
            $count_row = $res2->fetch_assoc();

            if ($filter == "unanswer" && $count_row["answer_count"] == 0) {
                $count[] = $row;
            } elseif ($filter == "answered" && $count_row["answer_count"] > 0) {
                $count[] = $row;
            }
        }

        echo count($count);
    }
}

function createQuestion() {
    $data = json_decode(file_get_contents("php://input"), true);

    $user_id = isset($data["user_id"]) ? intval($data["user_id"]) : 0;
    $title = isset($data["title"]) ? $data["title"] : "";
    $content = isset($data["content"]) ? $data["content"] : "";
    $create_at = date("Y-m-d H:i:s");
    $update_at = $create_at;


    echo QuestionModel::createQuestion($user_id, $title, $content, $create_at, $update_at);
}

function updateQuestion() {
    $data = json_decode(file_get_contents("php://input"), true);

    $question_id = isset($data["question_id"]) ? intval($data["question_id"]) : 0;
    $title = isset($data["title"]) ? $data["title"] : "";
    $content = isset($data["content"]) ? $data["content"] : "";
    $update_at = date("Y-m-d H:i:s");


    echo QuestionModel::updateQuestion($question_id, $title, $content, $update_at);
}

function deleteQuestion(){
    $question_id = isset($_GET["question_id"]) ? intval($_GET["question_id"]) : 0;

    echo QuestionModel::deleteQuestionById($question_id);
}
?>
