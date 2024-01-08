<?php
session_start();
include 'config.php';
require_once 'vendor/autoload.php';


$client = new GuzzleHttp\Client([
    'base_uri' => 'https://www.linkedin.com',
]);

$response = $client->request('POST', 'oauth/v2/accessToken?grant_type=authorization_code&code=' . $_POST['code'] . '&client_id='.CLIENT_ID.'&client_secret='.CLIENT_SECRET.'&redirect_uri='.REDIRECT_URI.'', [
    'forms_params' => [
        "grant_type" => "authorization_code",
        "code" => $_POST['code'],
        "client_id" => CLIENT_ID,
        "client_secret" => CLIENT_SECRET,
        "redirect_uri" => REDIRECT_URI,
    ]
]);
$res = json_decode($response->getBody());
$token = $res->access_token;
// var_dump($res);


$client1 = new GuzzleHttp\Client([
    'base_uri' => 'https://api.linkedin.com',
]);

$response = $client1->request('GET', 'v2/userinfo', [
    'headers' => [
        'Authorization' => 'Bearer ' . $token
    ],
]);
$totalRes = json_decode($response->getBody());
// var_dump($totalRes);

$lid = $totalRes->sub;
$name =$totalRes->name;
$email=$totalRes->email;
$picture=$totalRes->picture;

// conn 
$conn= new mysqli(DBHOST,DBUSER,DBPASSWORD,DATABASE);

// checking if already exist 
$query ='SELECT name FROM users WHERE `linkedin_id`="'.$lid.'"';
if($result=$conn->query($query)){
    if($result->num_rows>0){
        // echo 'already logined ';
    }else{
        $query = 'INSERT INTO users (`linkedin_id`,name,email,imageurl) VALUES ("'.$lid.'","'.$name.'","'.$email.'","'.$picture.'")';
if($execute =$conn->query($query)){
echo "added to db";

}else{
    echo $conn->error;
}
    }
}
$_SESSION['email']=$email;
$_SESSION['name']=$name;
$_SESSION['picture']=$picture;

echo "success";
?>