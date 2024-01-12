<?php
session_start();
include_once 'sqlQueries.php';

if(isset($_POST['comment'])){
if(isset($_SESSION['user_id'])){
$user_id=$_SESSION['user_id'];
$comment = $_POST['comment'];
$comment_id= uniqid();


    $query = 'INSERT INTO comments (user_id,comment,comment_id) VALUES("'.$user_id.'","'.$comment.'","'.$comment_id.'")';
    $result =sql_Query($query);

if($result){
if(isset($_POST['parent_id'])){
$query='UPDATE comments SET parent_comment= "'.$_POST['parent_id'].'"';
sql_Query($query);
}


    echo json_encode(["1",'Comment Added Succesfully',$comment_id]);
}else{
    echo json_encode(["0",'Comment couldnt added succesfully']);

}

}else{
    echo json_encode(["0",'please login again']);
}


}