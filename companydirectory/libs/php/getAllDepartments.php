<?php

ini_set('display_errors', 'On');
error_reporting(E_ALL);

$executionStartTime = microtime(true);
include("config.php");

header('Content-Type: application/json; charset=UTF-8');

$conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname, $cd_port, $cd_socket);

if (mysqli_connect_errno()) {
    $output['status']['code'] = "300";
    $output['status']['name'] = "failure";
    $output['status']['description'] = "database unavailable";
    $output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
    $output['data'] = [];
    mysqli_close($conn);
    echo json_encode($output);
    exit;
}

$search = isset($_GET['txt']) ? $conn->real_escape_string($_GET['txt']) : '';


$query = "
    SELECT 
        department.id, 
        department.name AS departmentName, 
        location.name AS locationName
    FROM department
    INNER JOIN location ON department.locationID = location.id
";

// Agregamos el filtro si hay texto en el input
if (!empty($search)) {
    $query .= "
        WHERE department.name LIKE '%$search%' 
        OR location.name LIKE '%$search%'
    ";
}

$result = $conn->query($query);

if (!$result) {
    $output['status']['code'] = "400";
    $output['status']['name'] = "executed";
    $output['status']['description'] = "query failed";
    $output['data'] = [];
    mysqli_close($conn);
    echo json_encode($output);
    exit;
}

$data = [];

while ($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
}

$output['status']['code'] = "200";
$output['status']['name'] = "ok";
$output['status']['description'] = "success";
$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
$output['data'] = $data;

mysqli_close($conn);
echo json_encode($output);
