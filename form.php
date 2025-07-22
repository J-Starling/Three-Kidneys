<?php
session_start();
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Ошибка соединения: " . $conn->connect_error);
}

$sirname = mysqli_real_escape_string($conn, $_POST['sirname']);
$email = mysqli_real_escape_string($conn, $_POST['email']);
$message = mysqli_real_escape_string($conn, $_POST['message']);

$query = "INSERT INTO feedback (sirname, email, message, created_at) VALUES ('$sirname', '$email', '$message', NOW())";

if ($conn->query($query)) {
    $_SESSION['form_success'] = true;
} else {
    $_SESSION['form_error'] = 'Ошибка отправки сообщения.';
}

$conn->close();
header("Location: feedback.php");
exit();
?>
