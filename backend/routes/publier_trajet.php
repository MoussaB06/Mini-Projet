<?php
session_start(); // ✅ À AJOUTER
require_once("../config/db.php");

$input = json_decode(file_get_contents("php://input"), true);

if (
    !isset($input["depart"], $input["arrivee"], $input["date"], $input["heure"],
    $input["passagers"], $input["marque_vehicule"], $input["modele_vehicule"], $input["prix"])
) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Champs manquants."]);
    exit;
}

// ✅ Récupérer le vrai ID de session
if (!isset($_SESSION['user']['id'])) {
    http_response_code(403);
    echo json_encode(["success" => false, "message" => "Utilisateur non connecté."]);
    exit;
}

$conducteur_id = $_SESSION['user']['id'];

$depart = htmlspecialchars(trim($input["depart"]));
$arrivee = htmlspecialchars(trim($input["arrivee"]));
$date = $input["date"];
$heure = $input["heure"];
$passagers = intval($input["passagers"]);
$prix = intval($input["prix"]);
$marque = htmlspecialchars(trim($input["marque_vehicule"]));
$modele = htmlspecialchars(trim($input["modele_vehicule"]));
$conforts = isset($input["conforts"]) ? json_encode($input["conforts"]) : null;
$options = isset($input["options"]) ? json_encode($input["options"]) : null;
$habituel = isset($input["habituel"]) && $input["habituel"] ? 1 : 0;

try {
    $stmt = $pdo->prepare("
        INSERT INTO trajets (
            conducteur_id, depart, arrivee, date_depart, heure_depart,
            places_disponibles, prix, marque_vehicule, modele_vehicule,
            confort, options, habituel
        ) VALUES (
            :conducteur_id, :depart, :arrivee, :date_depart, :heure_depart,
            :places_disponibles, :prix, :marque_vehicule, :modele_vehicule,
            :confort, :options, :habituel
        )
    ");

    $stmt->execute([
        ":conducteur_id" => $conducteur_id,
        ":depart" => $depart,
        ":arrivee" => $arrivee,
        ":date_depart" => $date,
        ":heure_depart" => $heure,
        ":places_disponibles" => $passagers,
        ":prix" => $prix,
        ":marque_vehicule" => $marque,
        ":modele_vehicule" => $modele,
        ":confort" => $conforts,
        ":options" => $options,
        ":habituel" => $habituel
    ]);

    echo json_encode(["success" => true, "message" => "Trajet inséré avec succès."]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Erreur serveur : " . $e->getMessage()]);
}
