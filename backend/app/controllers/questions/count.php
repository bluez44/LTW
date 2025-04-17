<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    if ($_SERVER["REQUEST_METHOD"] === "GET"){
        include("../../config/config.php");

        $filter = isset($_GET["filter"]) ? $_GET["filter"] :"all";
        $search = isset($_GET["search"]) ? $_GET["search"] :"";

        if($filter == "all"){
            if (!empty($search)) {
                $sql = "SELECT COUNT(*)  as count_row 
                        FROM question 
                        WHERE content LIKE '%$search%' OR title LIKE '%$search%'";
            }else{
                $sql = "SELECT COUNT(*)  as count_row 
                        FROM question";
            }
            $result = mysqli_query($connect, $sql);
            $count_row = mysqli_fetch_assoc($result);
            $count = $count_row["count_row"];
            echo $count;
        }else{
            if(!empty($search)) {
                $sql = "SELECT * FROM question 
                        WHERE content LIKE '%$search%' OR title LIKE '%$search%'";
            }else{
                $sql = "SELECT * FROM question";
            }
            $result = mysqli_query($connect, $sql);
            if (mysqli_num_rows($result) > 0){
                $count = [];
                while($row = mysqli_fetch_assoc($result)){
                    $question_id = $row["question_id"];
                    $sql = "SELECT COUNT(*) AS count_row FROM answer WHERE question_id = '$question_id'";
                    $res = mysqli_query($connect, $sql);
                    $count_row = mysqli_fetch_assoc($res);
                    if($filter == "unanswer"){
                        if($count_row["count_row"] == 0){
                            $count[] = $row;
                        }
                    }else{
                        if($count_row["count_row"] > 0){
                            $count[] = $row;
                        }
                    }
                }

                echo count( $count );
            }
        }
    }
?>