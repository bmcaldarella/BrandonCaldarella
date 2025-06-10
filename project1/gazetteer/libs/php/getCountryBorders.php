<?php
header('Content-Type: application/json');

$path = '../../data/countryBorders.geo.json';

if (!file_exists($path)) {
    echo json_encode(['error' => 'GeoJSON file not found.']);
    exit;
}

$json = file_get_contents($path);
$data = json_decode($json, true);

if (!isset($data['features'])) {
    echo json_encode(['error' => 'Invalid GeoJSON format.']);
    exit;
}

foreach ($data['features'] as &$feature) {
    if (isset($feature['properties']['name'])) {
        $feature['properties']['name'] = rtrim($feature['properties']['name'], '.');
    }
}

echo json_encode($data);
