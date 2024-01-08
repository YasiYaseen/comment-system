<?php 
include_once 'config.php';
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .wrapper{
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
    <img src="img/Rolling-1s-200px.gif" alt="">
</div>

    <script>
        const redirectUri = "<?php echo REDIRECT_URI ?>";
        // const redirectUri ='https://xcteam.in/tw/ln-comment/processLogin.html';


        const urlParams = new URLSearchParams(window.location.search);

     
        const authorizationCode = urlParams.get('code');
        const getAccessToken = async (authorizationCode) => {

            try {
                var  xhttp =new XMLHttpRequest();
                xhttp.onreadystatechange =function(){
                    if(this.readyState ==4 && this.status ==200){
                        if(this.responseText == 'success'){
                            console.log('success');
                            // window.location.href='index.php';
                            window.opener.location.href='home.php';
                            window.close();
                        }
                    }
                }
                xhttp.open("POST",'save-user.php',true);
                xhttp.setRequestHeader("Content-Type",'application/x-www-form-urlencoded');
                xhttp.send("code="+authorizationCode);

                // const tokenUrl = `https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&code=${(authorizationCode)}&redirect_uri=${(redirectUri)}&client_id=${(clientId)}&client_secret=${(clientSecret)}`;
                // const body = `grant_type=authorization_code&code=${(authorizationCode)}&redirect_uri=${(redirectUri)}&client_id=${(clientId)}&client_secret=${(clientSecret)}`;

                // const response = await fetch(tokenUrl, {
                //     method: 'POST',
                //     headers: {
                //         'Content-Type': 'application/x-www-form-urlencoded',
                //     },
                //     mode:'cors',
                // });
                // if (!response.ok) {
                //     throw new Error(`HTTP error! Status: ${response.status}`);
                // }
                // const tokenData = await response.json();
                // console.log('Access Token:', tokenData);
            } catch (error) {
                console.log(error.message);
            }

        }

        if (authorizationCode) {
            getAccessToken(authorizationCode);
            console.log(authorizationCode);
        } else {
            console.error('Authorization code not found in the URL.');
        }

    </script>
</body>

</html>
