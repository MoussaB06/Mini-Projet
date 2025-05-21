<?php
session_start();
header("Content-Type: application/json");

require_once("../config/db.php");

if (!isset($_SESSION['user']['id'])) {
    echo json_encode(["success" => false, "message" => "Non connecté"]);
    exit;
}

$conducteur_id = $_SESSION['user']['id'];
$pdo = getPDO();

try {
    $stmt = $pdo->prepare("SELECT * FROM trajets WHERE conducteur_id = ? ORDER BY date_depart DESC");
    $stmt->execute([$conducteur_id]);
    $trajets = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(["success" => true, "trajets" => $trajets]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Erreur serveur : " . $e->getMessage()]);
}
