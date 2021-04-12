<?php
include 'connect.php';
	header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization");
	header('Access-Control-Allow-Origin: *');
	header("Content-type: text/html; charset=utf-8");
	header("Access-Control-Allow-Methods: POST");
	 header("Content-type:application/json");

	mysqli_set_charset($conn, 'UTF8');
	

	if(isset($_GET['content'])){
		$data = $_GET['content'];
		

		date_default_timezone_set("Asia/Ho_Chi_Minh");
		$time = date("His");


		$sql = "INSERT INTO listtodo (content,time,checks)
		VALUES ('$data', $time,false)";

		if ($conn->query($sql) === TRUE) {

			$last_id = $conn->insert_id;
		  	$sqls = "SELECT * FROM listtodo WHERE id='$last_id' " ;
			$result = $conn->query($sqls);
			
			if ($result->num_rows > 0) {
			   while($row = $result->fetch_assoc()) {
			   		echo json_encode($row);
				}
			}

		} else {
		  echo "Error: " . $sql . "<br>" . $conn->error;
		}
	}else{
		echo "Test thôi đừng hack nha !!!";
	}
	$conn->close();
?>