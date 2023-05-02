<?php
header('Content-Type: application/json; charset=utf-8');
require('./cors.php');
function TotalPrice($client) {
    require_once("database.php");
    // dont touch this OSAMA
    $stmt = "SELECT SUM(price) as total_price FROM cart JOIN items ON cart.items = items.id WHERE cart.userid = '$client' AND orderid IS NULL";
    $result = $mysqli->query($stmt);

    if(!$result) {
        $data = [
            'status' => "500",
            'message' => 'Query failed',
        ];
        echo json_encode($data);
    } else {
        $row = $result->fetch_assoc();
        $totalPrice = $row['total_price'];
        $data = [
            'status' => "200",
            'message' => 'Query succeeded',
            'total_price' => $totalPrice,
        ];
        echo json_encode($data);
    }
}

$requestMethod = $_SERVER["REQUEST_METHOD"];

if ($requestMethod == "POST") {
    $input = json_decode(file_get_contents('php://input'), true);
    if (isset($input['client'])) {
        $client = $input['client'];

        echo TotalPrice($client);
        
    } else {
        $data = [
            'status' => "400",
            'message' => 'Bad Request',
        ];
        echo json_encode($data);
    }
} else {
    $data = [
        'status' => "405",
        'message' => 'Method Not Allowed',
    ];
    echo json_encode($data);
}
?>
