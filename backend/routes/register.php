<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../controllers/AuthController.php';

session_start();

try {
    $pdo = getPDO();
    $authController = new AuthController($pdo);

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $data = [
            'nom' => htmlspecialchars(trim($_POST['nom'] ?? '')),
            'email' => filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL),
            'mot_de_passe' => $_POST['mot_de_passe'] ?? '',
            'csrf_token' => $_POST['csrf_token'] ?? ''
        ];

        $response = $authController->register($data);

        if (!$response['success']) {
            $_SESSION['form_data'] = $data;
        }

        $_SESSION['auth_message'] = [
            'text' => $response['message'],
            'type' => $response['success'] ? 'success' : 'error'
        ];

        // ✅ Redirection ABSOLUE vers le bon fichier de vue
       header('Location: ' . $response['redirect']);
        exit();
    }

} catch (Exception $e) {
    $_SESSION['auth_message'] = [
        'text' => 'Une erreur critique est survenue',
        'type' => 'error'
    ];
    header('Location: /Mini-Projet/views/login_form.php'); // ✅ aussi corrigé ici
    exit();
}
