<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css">

    <link rel="stylesheet" href="style.css?id=1">
    <style>
    .login-btn {
        position: absolute;
        top: 10px;
        right: 10px;
    }

    .lgn-round {
        border: 1px solid #00bcd4;
        border-radius: 16%;
        padding: 5px 10px;
    }

    .lgn-round h4 {
        margin: 0;
    }

    .profile {
        display: flex;
        gap: 10px;
        align-items: center;
    }

    .profile img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
    </style>
</head>

<body>
    <div class="login-btn">
        <?php if (!isset($_SESSION['name'])) {
        ?>
        <div class="lgn-round" id="login-btn">
            <h4>Login</h4>
        </div>
        <?php
        } else { ?>
        <div class="profile">
            <img src="<?php echo $_SESSION['picture']; ?>" alt="">
            <h4><?php echo $_SESSION['name'] ?></h4>
            <div class="logout-btn" id="logout-btn">Logout</div>
        </div>
        <?php
        } ?>


    </div>
    <div class="block">
        <div class="block-header">
            <div class="title">
                <h2>Comments</h2>
                <div class="tag">12</div>
            </div>
            <div class="group-radio">
                <span class="button-radio">
                    <input id="latest" name="latest" type="radio" checked>
                    <label for="latest">Latest</label>
                </span>
                <div class="divider"></div>
                <span class="button-radio">
                    <input id="popular" name="latest" type="radio">
                    <label for="popular">Popular</label>
                </span>
            </div>
        </div>
        <div class="writing">
            <div contenteditable="true" class="textarea" autofocus spellcheck="false" id="messagebox">


            </div>
            <div class="footer">
                <div class="text-format">
                    <button class="btn"><i class="ri-bold"></i></button>
                    <button class="btn"><i class="ri-italic"></i></button>
                    <button class="btn"><i class="ri-underline"></i></button>
                    <button class="btn"><i class="ri-list-unordered"></i></button>
                </div>
                <div class="group-button" id="sendbutton">
                    <button class="btn"><i class="ri-at-line"></i></button>
                    <button class="btn primary">Send</button>
                </div>
            </div>
        </div>
        <div class="all-comments">
           
        </div>
        <div class="load">
            <span><i class="ri-refresh-line"></i>Loading</span>
        </div>
    </div>

    <script src="script.js"></script>
    <script>

    document.addEventListener('DOMContentLoaded',()=>{

        let isLoggedIn = <?php echo (isset($_SESSION['email'])) ? 'true' : 'false';  ?>

const sendbutton = document.getElementById('sendbutton');
let inputbox = document.getElementById('messagebox');

sendbutton.addEventListener('click', () => {
    if (isLoggedIn) {

        if (inputbox.innerText == "") {
            alert("empty");
        } else {

        }
    } else {
        window.location.href = 'login.php';
    }
})
const logoutBtn =document.getElementById('logout-btn');
if(logoutBtn){
    logoutBtn.addEventListener('click',async()=>{
    fetch('logout.php',
    {
        method: 'GET',
        credentials:'include'
    }
    ).then((response)=>{
        if(!response.ok){
            throw("Logout was Unsuccesful");
        }
        location.reload();
    }).catch(error => {
        console.log(error);
    })
})
}

const loginBtn = document.getElementById('login-btn');
if(loginBtn){
 loginBtn.addEventListener('click',()=>{

    window.location.href = 'login.php';

})   
}



    })
    </script>
</body>

</html>