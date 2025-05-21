<?php
session_start();
ini_set('display_errors', 1);
error_reporting(E_ALL);

require_once("../config/db.php");
require_once("../controllers/TrajetController.php");

header("Content-Type: application/json");

if (!isset($_SESSION['user']['id'])) {
  echo json_encode(["success" => false, "message" => "Non connecté"]);
  exit;
}

$input = json_decode(file_get_contents("php://input"), true);

if (
  !isset($input["depart"], $input["arrivee"], $input["date"], $input["passagers"])
) {
  http_response_code(400);
  echo json_encode([
    "success" => false,
    "message" => "Champs manquants : depart, arrivee, date, passagers"
  ]);
  exit;
}

$depart = trim($input["depart"]);
$arrivee = trim($input["arrivee"]);
$date = $input["date"];
$passagers = (int) $input["passagers"];
$conducteur_id = $_SESSION['user']['id']; // 🔥

try {
  $pdo = getPDO();

  $stmt = $pdo->prepare("
    SELECT * FROM trajets 
    WHERE depart = :depart 
      AND arrivee = :arrivee 
      AND date_depart = :date 
      AND places_disponibles >= :passagers
      AND utilisateur_id != :conducteur_id
  ");

  $stmt->execute([
    'depart' => $depart,
    'arrivee' => $arrivee,
    'date' => $date,
    'passagers' => $passagers,
    'conducteur_id' => $conducteur_id
  ]);

  $trajets = $stmt->fetchAll(PDO::FETCH_ASSOC);

  echo json_encode(["success" => true, "trajets" => $trajets]);
} catch (Exception $e) {
  http_response_code(500);
  echo json_encode([
    "success" => false,
    "message" => "Erreur serveur : " . $e->getMessage()
  ]);
}
