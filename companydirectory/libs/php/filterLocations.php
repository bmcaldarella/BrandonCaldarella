<?php
header('Content-Type: application/json');
include("config.php");
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

try {
    $locationID = isset($_POST['locationID']) ? intval($_POST['locationID']) : null;

    $sql = "SELECT id, name FROM location";
    $params = [];

    if ($locationID) {
        $sql .= " WHERE id = ?";
        $params[] = $locationID;
    }

    $stmt = $conn->prepare($sql);
    $stmt->execute($params);
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "status" => ["code" => "200", "description" => "Success"],
        "data" => $rows
    ]);
} catch (PDOException $e) {
    echo json_encode([
        "status" => ["code" => "500", "description" => "Query failed"],
        "error" => $e->getMessage()
    ]);
    exit;
}
?>
