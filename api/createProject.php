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

    $stmt = mysqli_prepare($db, "INSERT INTO projects (name, abbreviation) VALUES (?, ?)");
	mysqli_stmt_bind_param($stmt, "ss", $json['name'], $json['abbreviation']);
	mysqli_stmt_execute($stmt);

    $projectId = mysqli_insert_id($db);

    $stmt = mysqli_prepare($db, "INSERT INTO statuses (projectId, name, renderOrder) VALUES
    (?, 'New', 1),
    (?, 'Ponder', 2),
    (?, 'Implement', 3),
    (?, 'Done', 4);
    ");
	mysqli_stmt_bind_param($stmt, "iiii", $projectId, $projectId, $projectId, $projectId);
	mysqli_stmt_execute($stmt);
?>