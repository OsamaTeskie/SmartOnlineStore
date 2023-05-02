<?php

//given a client id, remove item from client cart
require('./cors.php');
function removeOut($client, $item) {
    require_once("database.php");
    $sql = "DELETE FROM cart
    WHERE userid = '$client' AND items = '$item'
    ORDER BY id
    LIMIT 1;";

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
    // this takes in client id
    $client = $input['client'];
    $item = $input['item'];

    echo removeOut($client, $item);
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
