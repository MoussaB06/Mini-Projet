<?php
session_start();
header("Content-Type: application/json");

require_once("../config/db.php"); // Connexion PDO ici
require_once("../controllers/TrajetController.php");

$input = json_decode(file_get_contents("php://input"), true);

if (!isset($_SESSION['user_id'])) {
    echo json_encode(["success" => false, "message" => "Utilisateur non connecté."]);
    exit;
}

if (!isset($input['trajet_id'], $input['nb_places'])) {
    echo json_encode(["success" => false, "message" => "Données manquantes."]);
    exit;
}

$trajet_id = intval($input['trajet_id']);
$nb_places = intval($input['nb_places']);
$user_id = $_SESSION['user_id'];

try {
    $pdo = getPDO();

    // Vérifie le nombre de places disponibles
    $stmt = $pdo->prepare("SELECT places_disponibles FROM trajets WHERE id = ?");
    $stmt->execute([$trajet_id]);
    $trajet = $stmt->fetch();

    if (!$trajet) {
        echo json_encode(["success" => false, "message" => "Trajet introuvable."]);
        exit;
    }

    if ($trajet['places_disponibles'] < $nb_places) {
        echo json_encode(["success" => false, "message" => "Pas assez de places disponibles."]);
        exit;
    }

    // Vérifie si l'utilisateur a déjà réservé ce trajet
    $stmt = $pdo->prepare("SELECT id FROM reservations WHERE trajet_id = ? AND utilisateur_id = ?");
    $stmt->execute([$trajet_id, $user_id]);
    if ($stmt->fetch()) {
        echo json_encode(["success" => false, "message" => "Vous avez déjà réservé ce trajet."]);
        exit;
    }

    // Insère la réservation
    $stmt = $pdo->prepare("INSERT INTO reservations (trajet_id, utilisateur_id, nb_places) VALUES (?, ?, ?)");
    $stmt->execute([$trajet_id, $user_id, $nb_places]);

    // Met à jour les places restantes
    $stmt = $pdo->prepare("UPDATE trajets SET places_disponibles = places_disponibles - ? WHERE id = ?");
    $stmt->execute([$nb_places, $trajet_id]);

    // Vérifie si les places sont à 0 pour mettre le statut à "complet"
    $stmt = $pdo->prepare("SELECT places_disponibles FROM trajets WHERE id = ?");
    $stmt->execute([$trajet_id]);
    $restantes = $stmt->fetchColumn();

    if ($restantes <= 0) {
        $stmt = $pdo->prepare("UPDATE trajets SET statut = 'complet' WHERE id = ?");
        $stmt->execute([$trajet_id]);
    }

    echo json_encode(["success" => true]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Erreur serveur : " . $e->getMessage()]);
}
