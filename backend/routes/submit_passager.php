<?php
session_start();
header('Content-Type: application/json');
file_put_contents(__DIR__ . '/debug_post.txt', "POST: " . print_r($_POST, true), FILE_APPEND);
file_put_contents(__DIR__ . '/debug_post.txt', "SESSION: " . print_r($_SESSION, true), FILE_APPEND);


if (!isset($_SESSION['user']['id'])) {
    echo json_encode(['success' => false, 'error' => 'Utilisateur non connecté']);
    exit;
}

$userId = $_SESSION['user']['id'];
$nom = trim($_POST['nom'] ?? '');
$telephone = trim($_POST['telephone'] ?? '');

if ($nom === '' || $telephone === '') {
    echo json_encode(['success' => false, 'error' => 'Champs manquants']);
    exit;
}

if (!preg_match('/^\+?\d{7,15}$/', $telephone)) {
    echo json_encode(['success' => false, 'error' => 'Téléphone invalide']);
    exit;
}

require_once __DIR__ . '/../config/db.php';
$pdo = getPDO();

try {
    $stmt = $pdo->prepare("
        UPDATE utilisateurs 
        SET nom = :nom, telephone = :telephone 
        WHERE id = :id
    ");
    $stmt->execute([
        ':nom' => $nom,
        ':telephone' => $telephone,
        ':id' => $userId
    ]);

    echo json_encode(['success' => true]);

} catch (PDOException $e) {
    echo json_encode(['success' => false, 'error' => 'Erreur SQL']);
}
