<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

	include 'pass.php';
    if(!$validationOk) {
        die("Invalid password");
    }

    $json = json_decode(file_get_contents('php://input'), true);
    unset($json["password"]);

    include 'db.php';


    $stmt = mysqli_prepare($db, "UPDATE tickets SET summary = ?, description = ?, statusId = ? WHERE id = ?");
	mysqli_stmt_bind_param($stmt, "ssii", $json['ticket']['summary'], $json['ticket']['description'], $json['ticket']['statusId'], $json['ticket']['id']);
	mysqli_stmt_execute($stmt);
	$result = mysqli_stmt_get_result($stmt);
?>