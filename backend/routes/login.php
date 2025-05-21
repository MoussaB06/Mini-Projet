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
        $email = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
        $password = $_POST['mot_de_passe'] ?? '';
        $csrfToken = $_POST['csrf_token'] ?? '';

        $response = $authController->login($email, $password, $csrfToken);

        $_SESSION['auth_message'] = [
            'text' => $response['message'],
            'type' => $response['success'] ? 'success' : 'error'
        ];

        // ✅ Redirection directe sans ajout de ../views
        header('Location: ' . $response['redirect']);
        exit();
    }

} catch (Exception $e) {
    $_SESSION['auth_message'] = [
        'text' => 'Erreur technique',
        'type' => 'error'
    ];
    header('Location: /Mini-Projet/views/login_form.php');
    exit();
}
