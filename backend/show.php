<?php
	include 'connect.php';
	header('Access-Control-Allow-Origin: *');
	header("Access-Control-Allow-Methods: GET, OPTIONS");
	header("Content-type: text/html; charset=utf-8");
	mysqli_set_charset($conn, 'UTF8');

	$sql = "SELECT * FROM listtodo";
	$result = $conn->query($sql);
	$list = array();
	if($result->num_rows > 0){
		while($row = $result->fetch_assoc()) {
			array_push($list,$row);
		}
		echo json_encode($list);
	}
	
?>