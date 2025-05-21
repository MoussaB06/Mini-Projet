<?php
require_once __DIR__ . '/../models/UserModel.php';

class AuthController {
    private UserModel $userModel;

    public function __construct(PDO $pdo) {
        $this->userModel = new UserModel($pdo);
    }

    /**
     * Inscription d'un nouvel utilisateur
     */
    public function register(array $data): array {
        try {
            if (!isset($data['csrf_token']) || !hash_equals($_SESSION['csrf_token'] ?? '', $data['csrf_token'])) {
                throw new RuntimeException('Token de sécurité invalide');
            }

            if (!$this->validateRegistrationData($data)) {
                throw new InvalidArgumentException('Tous les champs sont obligatoires');
            }

            if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
                throw new InvalidArgumentException('Format d\'email invalide');
            }

            if (strlen($data['mot_de_passe']) < 6) {
                throw new InvalidArgumentException('Le mot de passe doit contenir au moins 6 caractères');
            }

            $userData = [
                'nom' => htmlspecialchars($data['nom']),
                'email' => filter_var($data['email'], FILTER_SANITIZE_EMAIL),
                'mot_de_passe' => $data['mot_de_passe']
            ];

            $success = $this->userModel->createUser($userData);

            if (!$success) {
                throw new RuntimeException("Inscription échouée : email déjà utilisé ou erreur SQL.");
            }

            // ✅ Connexion automatique après inscription
            $user = $this->userModel->getUserByEmail($userData['email']);
            $_SESSION['user'] = [
                'id' => $user['id'],
                'nom' => $user['nom'],
                'email' => $user['email'],
                'role' => $user['role'] ?? null
            ];

            return [
                'success' => true,
                'message' => 'Inscription réussie !',
                'redirect' => 'http://localhost/Mini-Projet/Choice/index.php'// ✅ nouvelle page
            ];

        } catch (InvalidArgumentException | RuntimeException $e) {
            return $this->handleError($e->getMessage(), 'register_form.php');
        } catch (Exception $e) {
            error_log("Erreur système inscription : " . $e->getMessage());
            return $this->handleError("Erreur technique", 'register_form.php');
        }
    }

    /**
     * Connexion de l'utilisateur
     */
    public function login(string $email, string $password, string $csrfToken): array {
    try {
        if (!hash_equals($_SESSION['csrf_token'] ?? '', $csrfToken)) {
            throw new RuntimeException('Token CSRF invalide');
        }

        if (empty($email) || empty($password)) {
            throw new InvalidArgumentException('Email et mot de passe sont requis');
        }

        $user = $this->userModel->getUserByEmail($email);
        if (!$user) {
            throw new RuntimeException('Aucun compte trouvé avec cet email');
        }

        if (!password_verify($password, $user['mot_de_passe'])) {
            throw new RuntimeException('Mot de passe incorrect');
        }

        $_SESSION['user'] = [
            'id' => $user['id'],
            'nom' => $user['nom'],
            'email' => $user['email'],
            'role' => $user['role'] ?? 'user'
        ];
        $_SESSION['user_id'] = $user['id'];

        // ✅ Redirection spéciale post-inscription
        if (isset($_SESSION['just_registered'])) {
            unset($_SESSION['just_registered']);
            return [
                'success' => true,
                'message' => 'Bienvenue !',
                'redirect' => '/Mini-Projet/Choice/index.php'
            ];
        }

        // ✅ Redirection normale
        if ($user['role'] === 'conducteur') {
            return [
                'success' => true,
                'message' => 'Connexion réussie !',
                'redirect' => '/Mini-Projet/Conducteur/Completer Info/index.php'
            ];
        } else {
            return [
                'success' => true,
                'message' => 'Connexion réussie !',
                'redirect' => '/Mini-Projet/Passager/Completer Info/index.php'
            ];
        }

    } catch (InvalidArgumentException | RuntimeException $e) {
        return $this->handleError($e->getMessage(), 'login_form.php');
    } catch (Exception $e) {
        error_log("Erreur système login : " . $e->getMessage());
        return $this->handleError("Erreur technique", 'login_form.php');
    }
}


    /**
     * Déconnexion
     */
    public function logout(): void {
        $_SESSION = [];
        if (ini_get("session.use_cookies")) {
            $params = session_get_cookie_params();
            setcookie(session_name(), '', time() - 42000,
                $params["path"], $params["domain"],
                $params["secure"], $params["httponly"]
            );
        }
        session_destroy();
        header("Location: /Mini-Projet/views/login_form.php");
        exit();
    }

    private function validateRegistrationData(array $data): bool {
        return !empty($data['nom']) && !empty($data['email']) && !empty($data['mot_de_passe']);
    }

    private function handleError(string $message, string $redirect): array {
        return [
            'success' => false,
            'message' => $message,
            'redirect' => $redirect
        ];
    }
}
