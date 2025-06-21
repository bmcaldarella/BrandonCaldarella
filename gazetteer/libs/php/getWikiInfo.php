<?php
header("Content-Type: application/json");
$input = json_decode(file_get_contents("php://input"), true);

if (!isset($input['titles']) || !is_array($input['titles']) || empty($input['titles'])) {
    echo json_encode(["error" => "Missing or invalid titles array"]);
    exit;
}


$titles = array_slice($input['titles'], 0, 50);
$titleStr = implode('|', array_map('urlencode', $titles));

$url = "https://en.wikipedia.org/w/api.php?" . http_build_query([
    'action' => 'query',
    'format' => 'json',
    'origin' => '*',
    'prop' => 'coordinates|extracts|pageimages',
    'exintro' => true,
    'explaintext' => true,
    'titles' => $titleStr,
    'pithumbsize' => 200
]);

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode !== 200 || !$response) {
    echo json_encode(["error" => "Wikipedia API request failed"]);
    exit;
}

echo $response;
