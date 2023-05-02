<?php
$requestMethod = $_SERVER["REQUEST_METHOD"];

require('./cors.php');
require_once("database.php");

if($requestMethod == "GET") {
    header('Content-Type: application/json charset=utf-8');
    $sql = "SELECT review FROM reviews LIMIT 20";
    $result = $mysqli->query($sql);

    $final = [];
    while($row = $result->fetch_assoc()) {
        $final[] = $row['review'];
    }

    echo json_encode($final);
}

?>