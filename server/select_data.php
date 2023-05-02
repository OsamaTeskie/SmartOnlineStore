<?php
require_once("database.php");

if ($table_name = $_GET["from"]) {
  $sql = "SELECT * FROM $table_name";
  $result = $mysqli->query($sql);

  if ($result->num_rows > 0) {
    $rows = array();
    while ($row = $result->fetch_assoc()) {
      $rows[] = $row;
    }
    echo json_encode($rows);
  }
}
