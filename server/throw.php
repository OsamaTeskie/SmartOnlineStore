<?php
require 'database.php';
if(isset($_POST['body']))
{
    $get = $_POST['body'];
    $sql = "DELETE FROM cart WHERE items='$get';";
    if(!$mysqli->multi_query($sql)){
        echo "Error here";
    }
    echo $get;
}
?>