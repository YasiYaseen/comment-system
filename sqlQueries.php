<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

function sql_Query($query){
    error_reporting(E_ALL);
ini_set('display_errors', 1);
require __DIR__.'/connect.php';
    if(!$conn || $conn->connect_error) {
        echo 'no conn';
        return false;
    }
    $result = $conn->query($query);
    
    if (!$result) {
        // echo 'Error: ' . $conn->error;
        return $conn->error;
    }
    
    return $result;
}

function extractRecord($col,$idcol,$idval,$table,$additional=""){
    include_once 'connect.php';
    $query='SELECT '. $col .' FROM ' . $table .' WHERE '. $idcol .' = "'. $idval .'" '. $additional;
    $result = $conn->query($query);
    if($result){
        $rows=array();
        while($row =$result -> fetch_assoc()){
            $rows[]=$row;
        }
        
        return $rows;
    }else{
            error_log("Error in query: " . $query . " - " . $conn->error);
        $conn->close();
        return 'No Data';
    }
}
function extractRecordAll($col,$table,$additional=""){
    include_once 'connect.php';
    $query='SELECT '. $col .' FROM ' . $table . ' '. $additional;
    $result = $conn->query($query);
    if($result){
        $rows=array();
        while($row =$result -> fetch_assoc()){
            $rows[]=$row;
        }        $conn->close();
        return $rows;
    }else{
            error_log("Error in query: " . $query . " - " . $conn->error);
        return 'No Data';
    }
}