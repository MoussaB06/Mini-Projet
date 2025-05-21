<?php
session_start();
require_once("../config/db.php"); // ajuste le chemin si besoin



if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(["success" => false, "message" => "Non connecté"]);
    exit;
}
$pdo = getPDO(); // ✅ Manquait ici
$id = $_SESSION['user_id'];

$sql = "SELECT nom, telephone FROM utilisateurs WHERE id = ?";
$stmt = $pdo->prepare($sql);
$stmt->execute([$id]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user) {
    echo json_encode(["success" => true, "data" => $user]);
} else {
    echo json_encode(["success" => false, "message" => "Utilisateur introuvable"]);
}
