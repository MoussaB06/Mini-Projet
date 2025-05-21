<?php
session_start();
header("Content-Type: application/json");

require_once("../config/db.php");

if (!isset($_SESSION['user_id'])) {
    echo json_encode(["success" => false, "message" => "Non connecté"]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['nom'], $data['telephone'])) {
    echo json_encode(["success" => false, "message" => "Champs manquants"]);
    exit;
}

$pdo = getPDO();
$user_id = $_SESSION['user_id'];
$nom = trim($data['nom']);
$telephone = trim($data['telephone']);

try {
    $stmt = $pdo->prepare("UPDATE utilisateurs SET nom = ?, telephone = ? WHERE id = ?");
    $stmt->execute([$nom, $telephone, $user_id]);

    echo json_encode(["success" => true]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Erreur serveur : " . $e->getMessage()]);
}
