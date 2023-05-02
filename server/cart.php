<?php

// Check connection
require('./cors.php');
function getCart($client) {
    require_once("database.php");
    // current solution to add single quotes
    $sql = "SELECT * FROM cart WHERE userid = '$client' AND orderid IS NULL";
    $result = $mysqli->query($sql);

    $each = [];
    while($row = $result->fetch_assoc()) {
        // this should return item_number : item_id
        $each[] = $row['items'];
    };

    echo json_encode($each);
}

$requestMethod = $_SERVER["REQUEST_METHOD"];

//given a client id, get all items in client cart
if($requestMethod == "GET" && isset($_GET["id"])) {
    header('Content-Type: application/json charset=utf-8');
    $client = $_GET["id"];
    echo getCart($client);
} else {
    $data = [
        'status' => "400",
        'message' => 'Method Not Allowed',
    ];
    header('Content-Type: application/jsonl charset=utf-8');
    echo json_encode($data);
}
?>