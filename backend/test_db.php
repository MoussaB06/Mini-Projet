<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once __DIR__ . '/config/db.php';

try {
    // Test d'insertion avec les bons noms de colonnes
    $sql = "INSERT INTO utilisateurs (email, mot_de_passe, nom) VALUES ('test@test.com', 'hash', 'Test')";
    $affectedRows = $pdo->exec($sql);
    
    echo "Résultat de l'insertion : " . $affectedRows . " ligne(s) affectée(s)";
    
    // Vérification
    $stmt = $pdo->query("SELECT * FROM utilisateurs");
    $utilisateurs = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo "<pre>";
    print_r($utilisateurs);
    echo "</pre>";
    
} catch (PDOException $e) {
    die("ERREUR SQL: " . $e->getMessage());
}