<?php
require 'database.php';
if(isset($_POST['body']))
{
    $get = $_POST['body'];
    $sql = "INSERT INTO cart (items) VALUES ($get);";
    if(!$mysqli->multi_query($sql)){
        echo "Error here";
    }
    echo $get;
}
?>