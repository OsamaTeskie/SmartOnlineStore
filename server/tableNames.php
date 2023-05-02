<?php

$requestMethod = $_SERVER["REQUEST_METHOD"];

require('./cors.php');
require_once("database.php");
if($requestMethod == "GET") {
    header('Content-Type: application/json charset=utf-8');
    $sql = "SELECT table_name FROM information_schema.tables WHERE table_schema = '630project';";
    $result = $mysqli->query($sql);

    $final = [];
    while($row = $result->fetch_assoc()) {
        $final[] = $row["table_name"];
    }
    
    echo json_encode($final);
}

?>