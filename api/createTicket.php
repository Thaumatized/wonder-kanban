<?php
error_reporting(E_ALL);

	include 'pass.php';
    if(!$validationOk) {
        die("Invalid password");
    }

    $json = json_decode(file_get_contents('php://input'), true);
    unset($json["password"]);

    include 'db.php';

    $projectId = intval($json['projectId']);
    $defaultString = "New ticket";


	$idStmt = mysqli_prepare($db, "SELECT internalId FROM tickets WHERE projectId = ? ORDER BY internalId DESC LIMIT 1");
	mysqli_stmt_bind_param($idStmt, "i", $projectId);
    mysqli_stmt_execute($idStmt);
    $internalId = mysqli_fetch_array(mysqli_stmt_get_result($idStmt), MYSQLI_ASSOC)['internalId'] + 1;

	$statusStmt = mysqli_prepare($db, "SELECT id FROM statuses WHERE projectId = ? ORDER BY renderOrder ASC LIMIT 1");
	mysqli_stmt_bind_param($statusStmt, "i", $projectId);
    mysqli_stmt_execute($statusStmt);
    $statusId = mysqli_fetch_array(mysqli_stmt_get_result($statusStmt), MYSQLI_ASSOC)['id'];


    $stmt = mysqli_prepare($db, "INSERT INTO tickets (projectId, internalId, summary, description, statusId)
        VALUES (?, ?, ?, ?, ?)");
	mysqli_stmt_bind_param($stmt, "iissi", $projectId, $internalId, $defaultString, $defaultString, $statusId);
	mysqli_stmt_execute($stmt);
	$result = mysqli_stmt_get_result($stmt);
?>