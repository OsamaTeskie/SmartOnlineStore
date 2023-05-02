<?php
require('./cors.php');
function find($id) {
    require_once("database.php");
    $sql = "SELECT * FROM items WHERE id = '$id'";
    $result = $mysqli->query($sql);

    $final = [];
    $each = [];
    while($row = $result->fetch_assoc()) {
        // this should return item_number : item_id
        $each['id'] = $row['id'];
        $each['price'] = $row['price'];
        $each['name'] = $row['name'];
        $each['image_path'] = $row['image_path'];
    };

    echo json_encode($each, JSON_FORCE_OBJECT);
}

$requestMethod = $_SERVER["REQUEST_METHOD"];

// find an item based on item id
if($requestMethod == "GET" && isset($_GET["id"])) {
    header('Content-Type: application/json charset=utf-8');
    $id = $_GET["id"];
    echo find($id);
} else {
    $data = [
        'status' => "400",
        'message' => 'Method Not Allowed',
    ];
    header('Content-Type: application/jsonl charset=utf-8');
    echo json_encode($data);
}

?>