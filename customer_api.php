<?php
require 'db.php';
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "GET") {
  $result = $conn->query("SELECT * FROM customers ORDER BY id DESC");
  $customers = [];
  while ($row = $result->fetch_assoc()) {
    $customers[] = $row;
  }
  echo json_encode($customers);
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $id = $_POST["id"];
  $name = $_POST["name"];
  $address = $_POST["address"];
  $mobile = $_POST["mobile"];

  if ($id) {
    $stmt = $conn->prepare("UPDATE customers SET name=?, address=?, mobile=? WHERE id=?");
    $stmt->bind_param("sssi", $name, $address, $mobile, $id);
  } else {
    $stmt = $conn->prepare("INSERT INTO customers (name, address, mobile) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $name, $address, $mobile);
  }

  $stmt->execute();
  echo json_encode(["success" => true]);
}

if ($_SERVER["REQUEST_METHOD"] === "DELETE") {
  parse_str(file_get_contents("php://input"), $data);
  $id = $data["id"];
  $stmt = $conn->prepare("DELETE FROM customers WHERE id=?");
  $stmt->bind_param("i", $id);
  $stmt->execute();
  echo json_encode(["success" => true]);
}
?>
