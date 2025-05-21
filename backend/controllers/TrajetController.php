<?php
require_once("../config/db.php"); // <- Ce fichier initialise PDO + fonction getPDO()

class TrajetController {
    private $pdo;

    public function rechercherTrajetsPourConducteur($depart, $arrivee, $date, $passagers, $conducteurId) {
    $pdo = getPDO();
    $stmt = $pdo->prepare("
        SELECT t.*, 
               COALESCE(SUM(r.nb_places), 0) AS places_reservees,
               (t.places_disponibles - COALESCE(SUM(r.nb_places), 0)) AS places_restantes
        FROM trajets t
        LEFT JOIN reservations r ON t.id = r.trajet_id
        WHERE t.depart = :depart
          AND t.arrivee = :arrivee
          AND t.date_depart = :date
          AND t.conducteur_id != :conducteur_id
        GROUP BY t.id
        HAVING places_restantes >= :passagers
    ");

    $stmt->execute([
        ':depart' => $depart,
        ':arrivee' => $arrivee,
        ':date' => $date,
        ':conducteur_id' => $conducteurId,
        ':passagers' => $passagers
    ]);

    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}


    



    public function __construct() {
        $this->pdo = getPDO(); // utilisation de la fonction définie dans db.php
    }

    public function rechercherTrajets($depart, $arrivee, $date, $passagers) {
        $sql = "
            SELECT t.*, 
                   COALESCE(SUM(r.nb_places), 0) AS places_reservees,
                   (t.places_disponibles - COALESCE(SUM(r.nb_places), 0)) AS places_restantes
            FROM trajets t
            LEFT JOIN reservations r ON t.id = r.trajet_id
            WHERE t.depart = :depart
              AND t.arrivee = :arrivee
              AND t.date_depart = :date
            GROUP BY t.id
            HAVING places_restantes >= :passagers
        ";

        $stmt = $this->pdo->prepare($sql);

        $stmt->execute([
            'depart' => $depart,
            'arrivee' => $arrivee,
            'date' => $date,
            'passagers' => $passagers
        ]);

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
