<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "630project";

require('./cors.php');
function addIn($client, $item) {
    require_once("database.php");
    $sql = "INSERT INTO cart(items, userid) VALUES('$item', '$client')";
    $result = $mysqli->query($sql);

   if(!$result)
   {
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

if($requestMethod == "POST" && file_get_contents('php://input')) {
    header('Content-Type: application/json charset=utf-8');
    $input = json_decode(file_get_contents('php://input'), true);
    // this takes in client id
    $client = $input['client'];
    // this takes in item id
    $item = $input['item'];
    
    //this returns a string 
    echo addIn($client, $item);
} else {
    $data = [
        'status' => "400",
        'message' => 'Method Not Allowed',
    ];
    header('Content-Type: application/json charset=utf-8');
    echo json_encode($data);
}








//given a client id, remove item from client cart








//given a client id, get price of all items in client cart

?>