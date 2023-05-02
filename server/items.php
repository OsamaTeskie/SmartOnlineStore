<?php
require('cors.php');
function getItems() {
    require_once("database.php");
    $sql = "SELECT DISTINCT * FROM items";
    $result = $mysqli->query($sql);

    $final = array();
    while($row = $result->fetch_assoc()) {
        $each = [];
        $each['name'] = $row['name'];
        $each['img'] = $row['image_path'];
        $each['price'] = $row['price'];
        $each['id'] = $row['id'];

        array_push($final,json_encode($each, JSON_FORCE_OBJECT));
    };
    echo json_encode($final);
}

$requestMethod = $_SERVER["REQUEST_METHOD"];

// emit all items in the db
if($requestMethod == "GET") {
    header('Content-Type: application/json charset=utf-8');
    echo getItems();
} else {
    $data = [
        'status' => "400",
        'message' => 'Method Not Allowed',
    ];
    header('Content-Type: application/json charset=utf-8');
    echo json_encode($data);
}
?>