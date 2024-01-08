<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style> .wrapper{
            width: 100%;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            
        }
        </style>
</head>

<body>
    <div class="wrapper">
       <img src="img/signinlogo.jpeg" alt="" width="200" id="signinli"> 
    </div>



<script>
    const clientId =  '862wsm7tncsimi';
let signinLi =document.getElementById('signinli');
        const redirectUri = 'http://localhost/tasks/comment-system/processLogin.php';
        // const redirectUri ='https://xcteam.in/tw/ln-comment/processLogin.html';
signinLi.addEventListener('click',()=>{

signInUsingLinkedIn()
})
const signInUsingLinkedIn = async()=>{
// let response = await fetch('https://www.linkedin.com/oauth/v2/authorization?response_type=code&redirect_uri=https://www.linkedin.com/developers/tools/oauth/redirect&scope=profile%20email&client_id=862wsm7tncsimi');
try {
    // Redirect the user to the LinkedIn authorization page
    // window.location.href = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&redirect_uri=${redirectUri}&scope=profile%20email%20openid&client_id=${clientId}&state=yaseensstate`;
    const width = 600;
const height = 800;

// Calculate the center position
const left = (window.screen.width - width) / 2;
const top = (window.screen.height - height) / 2;
 let loginWindow =  window.open(`https://www.linkedin.com/oauth/v2/authorization?response_type=code&redirect_uri=${redirectUri}&scope=profile%20email%20openid&client_id=${clientId}&state=yaseensstate`,'Login Window',`width=${width},height=${height},left=${left},top=${top}`);
  loginWindow.opener=window;
} catch (error) {
    // Handle errors
    console.error(error);
}
}
</script>

</body>
</html>