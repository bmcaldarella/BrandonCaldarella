<?php
header('Content-Type: application/json');
include("config.php");
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$output = [];

try {
    $departmentID = isset($_POST['departmentID']) ? intval($_POST['departmentID']) : null;
    $locationID = isset($_POST['locationID']) ? intval($_POST['locationID']) : null;

    $where = [];
    $params = [];

    if ($departmentID) {
        $where[] = "personnel.departmentID = ?";
        $params[] = $departmentID;
    }

    if ($locationID) {
        $where[] = "department.locationID = ?";
        $params[] = $locationID;
    }

    $sql = "
        SELECT 
            personnel.id,
            personnel.firstName,
            personnel.lastName,
            personnel.email,
            department.name AS department,
            location.name AS location
        FROM personnel
        JOIN department ON personnel.departmentID = department.id
        JOIN location ON department.locationID = location.id
    ";

    if (count($where) > 0) {
        $sql .= " WHERE " . implode(" AND ", $where);
    }

    $stmt = $conn->prepare($sql);
    $stmt->execute($params);
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "status" => ["code" => "200", "description" => "Success"],
        "data" => $rows
    ]);
} catch (PDOException $e) {
    http_response_code(500); // <-- Para que lo puedas ver en el navegador
    echo "<pre>";
    echo "ERROR SQL: " . $e->getMessage();
    echo "</pre>";
    exit;
}

?>
