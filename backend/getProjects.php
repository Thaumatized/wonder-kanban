<?php
	include 'db.php';
	
	$stmt = mysqli_prepare($db, "SELECT * FROM projects");
	mysqli_stmt_execute($stmt);
	$result = mysqli_stmt_get_result($stmt);


	$statusStmt = mysqli_prepare($db, "SELECT * FROM statuses WHERE projectId = ?");
	mysqli_stmt_bind_param($statusStmt, "i", $projectId);
	
	echo("[");
	$first = true;
	while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
		if(!$first)
		{
			echo(",");
		}
		$first = false;

		$row['statuses'] = array();

		$projectId = $row['id'];
		mysqli_stmt_execute($statusStmt);
		$statusResult = mysqli_stmt_get_result($statusStmt);

		while ($statusRow = mysqli_fetch_array($statusResult, MYSQLI_ASSOC)) {
			unset($statusRow['0']);
			array_push($row['statuses'], $statusRow);
		}

		echo(json_encode($row));
	}
	echo("]");
?>
