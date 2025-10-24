<?php
session_start();

// ตรวจสอบว่า login แล้วหรือยัง
if (!isset($_SESSION['userid'])) {
    header("Location: log in.php");
    exit;
}

include_once("config/Database.php");
include_once("class/UserLogin.php");

$connectDB = new Database();
$db = $connectDB->getConnection();

$user = new UserLogin($db);
$userData = $user->userData($_SESSION['userid']);

if (!$userData) {
    header("Location: log in.php");
    exit;
}
?>

<!DOCTYPE html>
<html>

<head>
    <title>Big Bro sQuad.com</title>
    <script src="https://code.jquery.com/jquery-3.7.1.js"
        integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4=" crossorigin="anonymous" defer></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" type="text/css" href="css/CSS home.css">
    <script src="java/home.js" defer></script>
</head>

<body>

    <?php include_once("nav.php"); ?>
    <div class="container">
        <div class="sidebar">
            <input type="text" class="sidebar-search" placeholder="Search something...">

            <a href="#" class="sidebar-items">
                Menu 1
            </a>
            <a href="#" class="sidebar-items">
                Menu 2
            </a>
            <a href="#" class="sidebar-items">
                Menu 3
            </a>
            <a href="#" class="sidebar-items">
                Menu 4
            </a>
            <a href="#" class="sidebar-items">
                Menu 5
            </a>
        </div>
        <div id="productlist" class="product">

        </div>
    </div>

    <div class="modal" style="display: none;">
        <div class="modal-bg"></div>
        <div class="modal-page">
            <h2>Detail</h2><br>
            <div class="modaldesc-content">
                <img class="modaldesc-img" src="img/BTS.png" alt="T-shirt">
                <div class="modaldesc-detail">
                    <p style="font-size: 1.5vw;">Product name</p>
                    <p style="font-size: 1.2vw;">500 THB</p><br>
                    <p style="color: gray;">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore mollitia,
                        officia facere omnis recusandae aliquid cum excepturi nulla libero iure illum quis nostrum
                        delectus saepe et expedita dolor nobis ducimus.</p><br>
                    <div class="btn-control">
                        <button class="btn">
                            Close
                        </button>
                        <button class="btn btn-buy">
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal" style="display: none;">
        <div class="modal-bg"></div>
        <div class="modal-page">
            <h2>My cart</h2><br>
            <div class="cartlist">
                <div class="cartlist-items">
                    <div class="cartlist-left">
                        <img src="img/BTS.png" alt="T-shirt">
                        <div class="cartlist-detail">
                            <p style="font-size: 1.5vw;">Product name</p>
                            <p style="font-size: 1.2vw;">500 THB</p><br>
                        </div>
                    </div>
                    <div class="cartlist-right">
                        <p class="btnc">-</p>
                        <p style="margin: 0 20px">1</p>
                        <p class="btnc">+</p>
                    </div>
                </div>
                <div class="cartlist-items">
                    <div class="cartlist-left">
                        <img src="img/BTS.png" alt="T-shirt">
                        <div class="cartlist-detail">
                            <p style="font-size: 1.5vw;">Product name</p>
                            <p style="font-size: 1.2vw;">500 THB</p><br>
                        </div>
                    </div>
                    <div class="cartlist-right">
                        <p class="btnc">-</p>
                        <p style="margin: 0 20px">1</p>
                        <p class="btnc">+</p>
                    </div>
                </div>
                <div class="cartlist-items">
                    <div class="cartlist-left">
                        <img src="img/BTS.png" alt="T-shirt">
                        <div class="cartlist-detail">
                            <p style="font-size: 1.5vw;">Product name</p>
                            <p style="font-size: 1.2vw;">500 THB</p><br>
                        </div>
                    </div>
                    <div class="cartlist-right">
                        <p class="btnc">-</p>
                        <p style="margin: 0 20px">1</p>
                        <p class="btnc">+</p>
                    </div>
                </div>
            </div>
            <div class="btn-control">
                <button class="btn">
                    Cancel
                </button>
                <button class="btn btn-buy btn-checkout">
                    Checkout
                </button>
            </div>
        </div>
    </div>
    <script src="home.js"></script>
</body>

</html>