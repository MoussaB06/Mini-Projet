<?php
session_start();
header('Content-Type: application/json');

require_once("../config/db.php");

file_put_contents("debug_profil_conducteur.txt", print_r([
  'SESSION' => $_SESSION,
  'user_id' => $_SESSION['user']['id'] ?? null
], true));


if (!isset($_SESSION['user']['id'])) {
    echo json_encode(["success" => false, "message" => "Utilisateur non connecté"]);
    exit;
}

$conducteurId = $_SESSION['user']['id'];

try {
    $pdo = getPDO();
    $stmt = $pdo->prepare("SELECT nom, telephone, marque_vehicule, modele_vehicule FROM utilisateurs WHERE id = ?");
    $stmt->execute([$conducteurId]);
    $data = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($data) {
        echo json_encode(["success" => true, "profil" => $data]);
    } else {
        echo json_encode(["success" => false, "message" => "Profil introuvable"]);
    }
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Erreur serveur : " . $e->getMessage()]);
}
