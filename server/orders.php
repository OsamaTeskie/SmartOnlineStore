<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "630project";

require('cors.php');
function getItems($userid) {
    require_once("database.php");
    // $conn = new mysqli($servername, $username, $password, $dbname);
    $sql = "SELECT * FROM orders WHERE userid = '$userid'";
    $result = $mysqli->query($sql);

    $final = array();
    while($row = $result->fetch_assoc()) {
        $orderid = $row["orderid"];
        $sql = "SELECT items FROM cart WHERE orderid = '$orderid'";
        $result2 = $mysqli->query($sql);


        $items = array();
        while($row2 = $result2->fetch_assoc()) {
            $items[] = $row2["items"];
        }

        $row["items"] = json_encode($items);
        $final[] = $row;
    };

    echo json_encode($final);
}

$requestMethod = $_SERVER["REQUEST_METHOD"];

// emit all items in the db
if($requestMethod == "POST"){
    header('Content-Type: application/json charset=utf-8');
    $input = json_decode(file_get_contents('php://input'), true);
    
    $dateIssued = $input['dateIssue'];
    $dateReceived = $input['dateReceived'];
    $totalPrice = $input['TP'];
    $paymentCode = $input['paymentCode'];
    $type = $input['deliveryType'];
    $clientID = $input['clientID'];
    $tripID = $input['tripID'];
    
    $conn = new mysqli($servername, $username, $password, $dbname);
    $sql = "INSERT INTO orders(date_issued, date_received, total_price, payment_code, delivery_type, userid, tripid) VALUES('$dateIssued', '$dateReceived', $totalPrice, '$paymentCode', '$type', '$clientID', '$tripID')";
    $result = $conn->query($sql);
    $sql2 = "SELECT * FROM orders WHERE userid = '$clientID' AND total_price = '$totalPrice' AND date_issued = '$dateIssued'";
    $result = $conn->query($sql2);
    $id = '';
    while($row = $result->fetch_assoc()) {
        $id = $row['orderid'];
    }
    $data = [
        'status' => "200",
        'orderid' => $id,
    ];
    header('Content-Type: application/json charset=utf-8');
    echo json_encode($data);
    
}else if($requestMethod == "GET") {
    header('Content-Type: application/json charset=utf-8');
    $userid = $_GET["userid"];
    getItems($userid);
} else {
    $data = [
        'status' => "400",
        'message' => 'Method Not Allowed',
    ];
    header('Content-Type: application/json charset=utf-8');
    echo json_encode($data);
}



?>