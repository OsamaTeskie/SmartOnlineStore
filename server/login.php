<?php
require_once("database.php");
require_once("functions.php");
$uid = new uid();
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
if (isset($postdata) && !empty($postdata)) {
  $password = $request->password;
  $name = $request->name;

  $uidExists = $uid->uidExists($mysqli, $name, $name);

  if (!$uidExists) {
    http_response_code(400);
    echo json_encode(array("message" => "user doesn't exist"));
    return;
  }

  $hashedPassword = $uidExists["password"];
  $checkPassword = md5($uidExists["salt"] . $password) == $hashedPassword;

  if (!$checkPassword) {
    http_response_code(400);
    echo json_encode(array("message" => "invalid password"));
    return;
  }

  echo json_encode($uidExists);
}
