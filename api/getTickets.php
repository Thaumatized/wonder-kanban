<?php	
	include 'db.php';

	$projectId = intval($_GET['projectId']);

	$projectAbbreviationStmt = mysqli_prepare($db, "SELECT abbreviation FROM projects WHERE id = ?");
	mysqli_stmt_bind_param($projectAbbreviationStmt, "i", $projectId);
	mysqli_stmt_execute($projectAbbreviationStmt);
	$projectAbbreviationResult = mysqli_stmt_get_result($projectAbbreviationStmt);
	$projectAbbreviation = mysqli_fetch_array($projectAbbreviationResult, MYSQLI_ASSOC)['abbreviation'];

	$stmt = mysqli_prepare($db, "SELECT * FROM tickets WHERE projectId = ?");
	mysqli_stmt_bind_param($stmt, "i", $projectId);
	mysqli_stmt_execute($stmt);
	$result = mysqli_stmt_get_result($stmt);
	
	echo("[");
	$first = true;
	while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
		if(!$first)
		{
			echo(",");
		}
		$first = false;
		echo(json_encode($row));
	}
	echo("]");
?>
