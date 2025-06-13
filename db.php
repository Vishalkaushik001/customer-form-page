<?php
$host = "localhost";
$user = "root";
$pass = "12345678"; // Change as needed
$db = "customerdb";

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
?>
