<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "630project";

require('./cors.php');
$requestMethod = $_SERVER["REQUEST_METHOD"];
if($requestMethod == "POST" && file_get_contents('php://input')) {
    header('Content-Type: application/json charset=utf-8');
    $input = json_decode(file_get_contents('php://input'), true);
    // this takes in client id
    $client = $input['client'];
    // this takes in item id
    $address = $input['address'];
    $card = $input['card'];

    $conn = new mysqli($servername, $username, $password, $dbname);
    $sql = "UPDATE users SET address = '$address', card = '$card' WHERE login_id='$client';";
    $result = $conn->query($sql);
}

if($requestMethod == "GET") {
    header('Content-Type: application/json charset=utf-8');
    $client = $_GET['client'];
    $conn = new mysqli($servername, $username, $password, $dbname);
    $sql = "SELECT address FROM users WHERE login_id ='$client';";
    $result = $conn->query($sql);

    while($row = $result->fetch_assoc()) {
        // this should return item_number : item_id
        $each[] = $row['address'];
    };

    echo json_encode($each);
}

?>