<?php
header('Content-Type: application/json; charset=utf-8');

$lat = $_GET['lat'];
$lng = $_GET['lng'];
$username = 'bmcaldarella';

$url = "http://api.geonames.org/findNearbyPostalCodesJSON?lat=$lat&lng=$lng&username=$username";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$result = curl_exec($ch);
curl_close($ch);

echo $result;
?>
