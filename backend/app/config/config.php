<?php
    define("DB_HOST", "localhost");
    define("DB_NAME", "ltw");
    define("DB_USER", "root");
    define("DB_PASS", "");

    $connect = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);

    if(!$connect){
        die("". mysqli_connect_error());
    }
?>