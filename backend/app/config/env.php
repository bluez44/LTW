<?php
function loadEnv($file = __DIR__ . '/../.env') {
    if (!file_exists($file)) {
        throw new Exception(".env file not found");
    }
    return parse_ini_file($file);
}
?>
