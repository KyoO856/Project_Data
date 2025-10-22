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
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" type="text/css" href="css/CSS home.css">
</head>

<body>
    <?php include_once("nav.php"); ?>
    <div class="content">
        <h1>Welcome to Big Bro sQuad</h1>
        <p>You are successfully logged in!</p>
    </div>
</body>

</html>