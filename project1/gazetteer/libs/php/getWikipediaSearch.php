<?php
header("Content-Type: application/json");

if (!isset($_GET['country'])) {
    http_response_code(400);
    echo json_encode(["error" => "Missing country"]);
    exit;
}

$country = urlencode(urldecode($_GET['country']));
$query = "intitle:$country AND (museum OR landmark OR city OR capital)";
$url = "https://en.wikipedia.org/w/api.php?" . http_build_query([
    'action' => 'query',
    'list' => 'search',
    'srsearch' => $query,
    'format' => 'json',
    'origin' => '*',
    'srlimit' => 300
]);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode !== 200 || $response === false) {
    http_response_code(500);
    echo json_encode(["error" => "Failed to fetch Wikipedia search"]);
    exit;
}

echo $response;


