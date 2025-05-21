<?php
session_start();
header("Content-Type: application/json");

require_once("../config/db.php");

$input = json_decode(file_get_contents("php://input"), true);
file_put_contents("debug_reservation_conducteur.txt", print_r([
  'session_user_id' => $_SESSION['user']['id'] ?? null,
  'input' => $input
], true));


if (!isset($_SESSION['user']['id'])) {
    echo json_encode(["success" => false, "message" => "Utilisateur non connecté."]);
    exit;
}

if (!isset($input['trajet_id'], $input['nb_places'])) {
    echo json_encode(["success" => false, "message" => "Données manquantes."]);
    exit;
}

$trajet_id = intval($input['trajet_id']);
$nb_places = intval($input['nb_places']);
$conducteur_id = $_SESSION['user']['id'];

try {
    $pdo = getPDO();

    // Vérifier si le trajet existe et appartient à quelqu'un d'autre
    $stmt = $pdo->prepare("SELECT * FROM trajets WHERE id = ?");
    $stmt->execute([$trajet_id]);
    $trajet = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$trajet) {
        echo json_encode(["success" => false, "message" => "Trajet introuvable."]);
        exit;
    }

    if ($trajet['conducteur_id'] == $conducteur_id) {
        echo json_encode(["success" => false, "message" => "Vous ne pouvez pas réserver votre propre trajet."]);
        exit;
    }

    if ($trajet['places_disponibles'] < $nb_places) {
        echo json_encode(["success" => false, "message" => "Pas assez de places disponibles."]);
        exit;
    }

    // Vérifier si le conducteur a déjà réservé ce trajet
    $stmt = $pdo->prepare("SELECT id FROM reservations WHERE trajet_id = ? AND utilisateur_id = ?");
    $stmt->execute([$trajet_id, $conducteur_id]);
    if ($stmt->fetch()) {
        echo json_encode(["success" => false, "message" => "Vous avez déjà réservé ce trajet."]);
        exit;
    }

    // Enregistrer la réservation
    $stmt = $pdo->prepare("INSERT INTO reservations (trajet_id, utilisateur_id, nb_places) VALUES (?, ?, ?)");
    $stmt->execute([$trajet_id, $conducteur_id, $nb_places]);

    // Mettre à jour les places restantes
    $stmt = $pdo->prepare("UPDATE trajets SET places_disponibles = places_disponibles - ? WHERE id = ?");
    $stmt->execute([$nb_places, $trajet_id]);

    echo json_encode(["success" => true]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Erreur serveur : " . $e->getMessage()]);
}
