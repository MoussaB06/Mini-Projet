<?php
$host = 'localhost';
$dbname = 'covoiturage';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname; charset=utf8mb4", $username, $password);
    // Configuration séparée des attributs
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    die("Erreur de connexion : " . $e->getMessage());
}

// Fonction pour récupérer la connexion PDO
function getPDO() {
    global $pdo;
    return $pdo;
}