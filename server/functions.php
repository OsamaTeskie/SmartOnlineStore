<?php
class uid {
  function uidExists($mysqli, $login_id, $email)
  {
    $sql = "SELECT * FROM users WHERE login_id = '$login_id' OR email = '$email';";
    $result = $mysqli->query($sql);
  
    if ($row = $result->fetch_assoc()) {
      return $row;
    } else {
      return false;
    }
  }

}

