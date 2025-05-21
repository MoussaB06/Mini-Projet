<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once("../config/db.php");
require_once("../controllers/TrajetController.php");

header("Content-Type: application/json");

$input = json_decode(file_get_contents("php://input"), true);

// Sauvegarde pour debug
file_put_contents("debug_input.txt", print_r($input, true));

if (
    !isset($input["depart"], $input["arrivee"], $input["date"], $input["passagers"])
) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Champs manquants : depart, arrivee, date, passagers"
    ]);
    exit;
}

$depart = trim($input["depart"]);
$arrivee = trim($input["arrivee"]);
$date = $input["date"];
$passagers = (int) $input["passagers"];

if ($depart === "" || $arrivee === "" || $date === "" || $passagers <= 0) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Champs invalides"
    ]);
    exit;
}

try {
    $controller = new TrajetController();
    $trajets = $controller->rechercherTrajets($depart, $arrivee, $date, $passagers);

    echo json_encode([
        "success" => true,
        "trajets" => $trajets
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Erreur serveur : " . $e->getMessage()
    ]);
}
