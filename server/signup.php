<?php
require_once("database.php");
require_once("functions.php");
$uid = new uid();
$postdata = file_get_contents("php://input");
if (isset($postdata) && !empty($postdata)) {
  $request = json_decode($postdata);
  $login_id = $request->login_id;
  $password = $request->password;
  $rnd = bin2hex(random_bytes(20));
  $hashedPassword = md5($rnd . $password);
  $email = $request->email;
  $admin = $request->admin;

  if ($uid->uidExists($mysqli, $login_id, $email)) {
    http_response_code(400);
    echo json_encode(array("message" => "user exists"));
    return;
  }

  if (!preg_match("/^[a-zA-Z0-9]+$/", $login_id)) {
    http_response_code(400);
    echo json_encode(array("message" => "invalid login id"));
    return;
  }

  if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(array("message" => "invalid email"));
    return;
  }

  $sql = "INSERT INTO users(login_id, email, password, salt, admin) VALUES ('$login_id','$email','$hashedPassword', '$rnd', '$admin')";
  $mysqli->query($sql);
}
