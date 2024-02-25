<?php	
	include 'db.php';
	$stmt = mysqli_prepare($db, "SELECT * FROM tickets WHERE projectId = ?");
	$projectId = intval($_GET['projectId']);
	mysqli_stmt_bind_param($stmt, "i", $projectId);
	mysqli_stmt_execute($stmt);
	$result = mysqli_stmt_get_result($stmt);
	
	echo("[");
	$first = true;
	while ($row = mysqli_fetch_array($result)) {
		unset($row['0']);
		if(!$first)
		{
			echo(",");
		}
		$first = false;
		echo(json_encode($row));
	}
	echo("]");
	//*/
?>
