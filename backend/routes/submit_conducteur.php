<?php
session_start();
header('Content-Type: application/json');

// Vérification de session
if (!isset($_SESSION['user']['id'])) {
    echo json_encode(['success' => false, 'error' => 'Utilisateur non connecté']);
    exit;
}

require_once __DIR__ . '/../config/db.php';
$pdo = getPDO();
$userId = $_SESSION['user']['id'];

// Lecture des champs texte
$nom = trim($_POST['nom'] ?? '');
$telephone = trim($_POST['telephone'] ?? '');
$marque = trim($_POST['marque_vehicule'] ?? '');
$modele = trim($_POST['modele_vehicule'] ?? '');

file_put_contents("debug_POST.txt", print_r($_POST, true));
file_put_contents("debug_FILES.txt", print_r($_FILES, true));

// Vérification des champs obligatoires
if ($nom === '' || $telephone === '' || $marque === '' || $modele === '') {
    echo json_encode(['success' => false, 'error' => 'Champs manquants']);
    exit;
}

// Dossier upload
$uploadDir = __DIR__ . '/../../uploads/conducteurs/';
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

// Fonction de sauvegarde fichier
function saveFile($inputName, $prefix, $userId, $uploadDir) {
    if (!isset($_FILES[$inputName]) || $_FILES[$inputName]['error'] !== UPLOAD_ERR_OK) {
        return null;
    }

    $ext = pathinfo($_FILES[$inputName]['name'], PATHINFO_EXTENSION);
    $filename = $prefix . '_' . $userId . '.' . $ext;
    $destination = $uploadDir . $filename;

    if (!move_uploaded_file($_FILES[$inputName]['tmp_name'], $destination)) {
        error_log("Échec upload: $inputName");
        return null;
    }

    return 'uploads/conducteurs/' . $filename;
}

// Sauvegarde des fichiers uniques
$photo         = saveFile('photo', 'photo', $userId, $uploadDir);
$carteIdentite = saveFile('carte_identite', 'identite', $userId, $uploadDir);
$permis        = saveFile('permis', 'permis', $userId, $uploadDir);
$carteGrise    = saveFile('carte_grise', 'grise', $userId, $uploadDir);
$assurance     = saveFile('assurance', 'assurance', $userId, $uploadDir);

// Sauvegarde des photos véhicule multiples
$photosVehicule = [];
if (isset($_FILES['photos_vehicule'])) {
    foreach ($_FILES['photos_vehicule']['tmp_name'] as $index => $tmpName) {
        if ($_FILES['photos_vehicule']['error'][$index] === UPLOAD_ERR_OK) {
            $ext = pathinfo($_FILES['photos_vehicule']['name'][$index], PATHINFO_EXTENSION);
            $filename = 'vehicule_' . $userId . '_' . $index . '.' . $ext;
            $destination = $uploadDir . $filename;

            if (move_uploaded_file($tmpName, $destination)) {
                $photosVehicule[] = 'uploads/conducteurs/' . $filename;
            } else {
                error_log("Échec upload vehicule $index");
            }
        }
    }
}
$photosVehiculeJson = json_encode($photosVehicule);

// Mise à jour en BDD
try {
    $stmt = $pdo->prepare("
        UPDATE utilisateurs SET
            nom = :nom,
            telephone = :telephone,
            marque_vehicule = :marque_vehicule,
            modele_vehicule = :modele_vehicule,
            photo_profil = :photo,
            carte_identite = :identite,
            permis = :permis,
            carte_grise = :grise,
            assurance = :assurance,
            photos_vehicule = :vehicules
        WHERE id = :id
    ");

    $stmt->execute([
        ':nom' => $nom,
        ':telephone' => $telephone,
        ':marque_vehicule' => $marque,
        ':modele_vehicule' => $modele,
        ':photo' => $photo,
        ':identite' => $carteIdentite,
        ':permis' => $permis,
        ':grise' => $carteGrise,
        ':assurance' => $assurance,
        ':vehicules' => $photosVehiculeJson,
        ':id' => $userId
    ]);

    echo json_encode(['success' => true]);
} catch (PDOException $e) {
    error_log("Erreur SQL: " . $e->getMessage());
    echo json_encode(['success' => false, 'error' => 'Erreur SQL']);
}
