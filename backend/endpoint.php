<?php
	include 'connect.php';
	header('Access-Control-Allow-Origin: *');
	header("Access-Control-Allow-Methods: GET, OPTIONS");
	header("Content-type: text/html; charset=utf-8");
	mysqli_set_charset($conn, 'UTF8');

	if(isset($_REQUEST['id']) and isset($_REQUEST['check'])){
		$id = $_GET['id'];
		$check = $_GET['check'];
		
		date_default_timezone_set("Asia/Ho_Chi_Minh");
		$time = date("His");

		$sql = "UPDATE listtodo SET time='$time',checks='$check' WHERE id='$id' ";

		if ($conn->query($sql) === TRUE) {
		  	$sql = "SELECT * FROM listtodo";
			$result = $conn->query($sql);
			$list = array();
			if($result->num_rows > 0){
				while($row = $result->fetch_assoc()) {
					array_push($list,$row);
				}
				echo json_encode($list);
			}
		} else {
		  echo "Error updating record: " . $conn->error;
		}
	
	}
?>