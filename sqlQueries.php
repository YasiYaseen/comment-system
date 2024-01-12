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

function extractRecord($col,$idcol,$idval,$table,$additional=""){
    include_once 'connect.php';
    $query='SELECT '. $col .' FROM ' . $table .' WHERE '. $idcol .' = "'. $idval .'" '. $additional;
    $result = $conn->query($query);
    if($result){
        $rows=array();
        while($row =$result -> fetch_assoc()){
            $rows[]=$row;
        }
        
        $conn->close();
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
        $conn->close();
        return 'No Data';
    }
}