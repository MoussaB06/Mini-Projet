<?php
class UserModel {
    private PDO $pdo;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    public function getUserByEmail(string $email): ?array {
        $stmt = $this->pdo->prepare("SELECT * FROM utilisateurs WHERE email = ? LIMIT 1");
        $stmt->execute([$email]);
        return $stmt->fetch(PDO::FETCH_ASSOC) ?: null;
    }

    public function createUser(array $data): bool {
        // LOG 1 : données reçues
        file_put_contents(__DIR__ . '/../log_userModel.txt', "createUser() appelé avec : " . json_encode($data) . "\n", FILE_APPEND);

        // Validation
        if (empty($data['nom']) || empty($data['email']) || empty($data['mot_de_passe'])) {
            file_put_contents(__DIR__ . '/../log_userModel.txt', "Données manquantes\n", FILE_APPEND);
            return false;
        }

        if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            file_put_contents(__DIR__ . '/../log_userModel.txt', "Email invalide\n", FILE_APPEND);
            return false;
        }

        if ($this->getUserByEmail($data['email'])) {
            file_put_contents(__DIR__ . '/../log_userModel.txt', "Email déjà utilisé\n", FILE_APPEND);
            return false;
        }

        try {
            $stmt = $this->pdo->prepare("
                INSERT INTO utilisateurs (nom, email, mot_de_passe)
                VALUES (:nom, :email, :mot_de_passe)
            ");

            $executed = $stmt->execute([
                ':nom' => $data['nom'],
                ':email' => $data['email'],
                ':mot_de_passe' => password_hash($data['mot_de_passe'], PASSWORD_DEFAULT)
            ]);

            if (!$executed) {
                file_put_contents(__DIR__ . '/../log_userModel.txt', "Échec d'exécution SQL\n", FILE_APPEND);
                file_put_contents(__DIR__ . '/../log_userModel.txt', print_r($stmt->errorInfo(), true), FILE_APPEND);
            } else {
                file_put_contents(__DIR__ . '/../log_userModel.txt', "✅ Utilisateur inséré avec succès\n", FILE_APPEND);
            }

            return $executed;

        } catch (PDOException $e) {
            file_put_contents(__DIR__ . '/../log_userModel.txt', "Erreur SQL : " . $e->getMessage() . "\n", FILE_APPEND);
            return false;
        }
    }

    public function getPDO(): PDO {
        return $this->pdo;
    }
}
