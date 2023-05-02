<?php

$requestMethod = $_SERVER["REQUEST_METHOD"];

require('./cors.php');

if($requestMethod == "GET") {
    require_once("database.php");
    header('Content-Type: application/json charset=utf-8');
    // $conn = new mysqli($servername, $username, $password, $dbname);
    $itemid = $_GET["itemid"];
    $sql = "SELECT SUM(review)/COUNT(review) AS total FROM productreviews WHERE itemid = $itemid;";
    $result = $mysqli->query($sql);

    $row = $result->fetch_assoc();
    $data = array($itemid => intval($row["total"]));

    echo json_encode($data);
}

?>