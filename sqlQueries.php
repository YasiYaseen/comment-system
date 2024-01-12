<?php


function sql_Query($query){
    include_once 'connect.php';
    $result = $conn->query($query);

    if (!$result) {
        // echo 'Error: ' . $conn->error;
        return false;
    }
    
    return $result;
}