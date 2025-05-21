<?php
session_start();

// 📄 Journalisation pour debug (optionnel)
file_put_contents(__DIR__ . '/log_role_debug.txt', "=== Appel à set_role.php ===\n", FILE_APPEND);
file_put_contents(__DIR__ . '/log_role_debug.txt', print_r($_SESSION, true), FILE_APPEND);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $role = $_POST['role'] ?? '';

    // Validation du rôle
    if (!in_array($role, ['conducteur', 'passager'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Rôle invalide']);
        exit;
    }

    // Vérifie que l'utilisateur est connecté
    if (!isset($_SESSION['user']['id'])) {
        http_response_code(401);
        echo json_encode(['success' => false, 'error' => 'Utilisateur non connecté']);
        exit;
    }

    $userId = $_SESSION['user']['id'];

    require_once __DIR__ . '/../config/db.php';
    $pdo = getPDO();

    try {
        $stmt = $pdo->prepare("UPDATE utilisateurs SET role = :role WHERE id = :id");
        $success = $stmt->execute([
            ':role' => $role,
            ':id' => $userId
        ]);

        if ($success) {
            // Met à jour la session aussi
            $_SESSION['user']['role'] = $role;

            echo json_encode([
                'success' => true,
                'redirect' => $role === 'conducteur'
                    ? '/Mini-Projet/Conducteur/Completer info/index.html'
                    : '/Mini-Projet/Passager/Completer info/index.html'
            ]);
        } else {
            echo json_encode(['success' => false, 'error' => 'Échec de la mise à jour']);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'Erreur SQL : ' . $e->getMessage()]);
    }
} else {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Méthode non autorisée']);
}
