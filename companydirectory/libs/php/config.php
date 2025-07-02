<?php

$cd_host = "127.0.0.1";
$cd_port = 3306;
$cd_socket = "";

$cd_dbname = "companydirectory";
$cd_user = "root";
$cd_password = "";

try {
    $conn = new PDO(
        "mysql:host=$cd_host;dbname=$cd_dbname;charset=utf8mb4",
        $cd_user,
        $cd_password
    );
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode([
        "status" => ["code" => "500", "description" => "Database connection failed"],
        "error" => $e->getMessage()
    ]);
    exit;
}
?>
