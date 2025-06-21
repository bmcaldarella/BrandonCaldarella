<?php
header('Content-Type: application/json; charset=utf-8');

$query = $_GET['query'];
$username = 'bmcaldarella'; 

$url = "http://api.geonames.org/wikipediaSearchJSON?q=$query&maxRows=10&username=$username";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$result = curl_exec($ch);
curl_close($ch);

echo $result;
?>
