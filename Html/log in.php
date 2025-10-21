<?php
session_start();

include_once("config/Database.php");
include_once("class/UserLogin.php");
include_once("class/Utils.php");

$connectDB = new Database();
$db = $connectDB->getConnection();

$user = new UserLogin($db);
$bs = new Bootstrap();

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['login'])) {
    $user->setEmail($_POST['email']);
    $user->setPassword($_POST['password']);

    if ($user->emailNotExists()) {
        $bs->displayAlert("ไม่พบอีเมลนี้ในระบบ", "danger");
    } else {
        if (!$user->verifyPassword()) {
            $bs->displayAlert("รหัสผ่านไม่ถูกต้อง", "danger");
        }
    }
}
?>

<!DOCTYPE html>
<html>

<head>
    <title>Big Bro sQuad.com</title>
    <link rel="stylesheet" type ="text/css" href="css/CSS log in.css">
</head>
<body>
    <img src="img/dbell.png" alt="DUMBBELL">
    <h1>Log in</h1>
    <form>
        <input type ="text"
        name="user"
        placeholder ="E-mail"autofocus><br>
        <input type ="password"
        name = "pas"
        placeholder ="Password"><br>
        <button type="submit">Log in</button>
    </form>
    <p>Don't have an account? 
      <a href="sign up.html">sign up</a>
    </p>
</body>
</html>