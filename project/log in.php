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
        $bs->displayAlert("Email is not exists", "danger");
    } else {
        if (!$user->verifyPassword()) {
            $bs->displayAlert("Password do not match", "danger");
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
        name = "password"
        placeholder ="Password"><br>
        <button type="submit">Log in</button>
    </form>
    <p>Don't have an account? 
      <a href="sign up.php">sign up</a>
    </p>
</body>
</html>