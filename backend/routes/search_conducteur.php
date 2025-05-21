<?php
session_start();
require_once("../config/db.php");
require_once("../controllers/TrajetController.php");

header("Content-Type: application/json");

file_put_contents("debug_session_conducteur.txt", print_r($_SESSION, true));

// Vérification connexion
if (!isset($_SESSION["user"]["id"])) {
    echo json_encode(["success" => false, "message" => "Utilisateur non connecté"]);
    exit;
}

$input = json_decode(file_get_contents("php://input"), true);
file_put_contents("debug_input_conducteur.txt", print_r($input, true));

if (
    !isset($input["depart"], $input["arrivee"], $input["date"], $input["passagers"])
) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Champs manquants"
    ]);
    exit;
}

$depart = trim($input["depart"]);
$arrivee = trim($input["arrivee"]);
$date = $input["date"];
$passagers = (int) $input["passagers"];
$conducteurId = $_SESSION["user"]["id"];

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
    $trajets = $controller->rechercherTrajetsPourConducteur($depart, $arrivee, $date, $passagers, $conducteurId);

    file_put_contents("debug_conducteur_result.txt", print_r($trajets, true));

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
