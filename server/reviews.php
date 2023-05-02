<?php
//given a client id, remove item from client cart
require('./cors.php');

function addReview($input) {
    require_once("database.php");

    $userid = $input['client'];
    $review = $input['review'];
    $tableName = $input['tableName'];

    if ($tableName == "reviews"){
        $sql = "INSERT INTO $tableName (review, userid) VALUES('$review', '$userid')";
    }else {
        $itemid = $input['itemid'];
        $sql = "INSERT INTO $tableName (review, itemid, userid) VALUES('$review', '$itemid', '$userid')";
    }
    
    $result = $mysqli->query($sql);

    if(!$result) {
        $data = [
            'status' => "500",
            'message' => 'Query failed',
        ];
        header('Content-Type: application/json charset=utf-8');
        echo json_encode($data);
    } else {
        $data = [
            'status' => "200",
            'message' => 'Query succeeded',
        ];
        header('Content-Type: application/json charset=utf-8');
        echo json_encode($data);
    }
}


$requestMethod = $_SERVER["REQUEST_METHOD"];


if ($requestMethod == "POST" && file_get_contents('php://input')) {
    header('Content-Type: application/jsonl charset=utf-8');
    $input = json_decode(file_get_contents('php://input'), true);

    addReview($input);
}
else {
    $data = [
        'status' => "400",
        'message' => 'Method Not Allowed',
    ];
    header('Content-Type: application/json charset=utf-8');
    echo json_encode($data);
} 

?>
