<?php
require_once("../config/db.php");
header("Content-Type: application/json");
session_start();

if (!isset($_GET['id'])) {
    echo json_encode(["success" => false, "message" => "ID conducteur manquant"]);
    exit;
}

$pdo = getPDO();
$id = intval($_GET['id']);

$stmt = $pdo->prepare("SELECT nom, niveau_experience, note, nb_avis FROM utilisateurs WHERE id = ?");
$stmt->execute([$id]);
$data = $stmt->fetch(PDO::FETCH_ASSOC);

if ($data) {
    echo json_encode(["success" => true, "conducteur" => $data]);
} else {
    echo json_encode(["success" => false, "message" => "Conducteur introuvable"]);
}
