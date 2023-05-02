<?php
require_once("database.php");

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
if (isset($postdata) && !empty($postdata)) {
  $sql = $request->query;
  $result = $mysqli->multi_query($sql);

  $json = array();
  do {
    if ($result = $mysqli->store_result()) {
      $json[] = $result->fetch_all(MYSQLI_ASSOC);
      $result->free();
    }
  } while ($mysqli->next_result());
  echo json_encode($json);
}
