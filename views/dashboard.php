<?php
session_start();
if (!isset($_SESSION['user'])) {
    header('Location: ../backend/routes/login.php');
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="../Login/style.css" />
    <script defer src="../Login/script.js"></script>
    <title>Dashboard - <?= htmlspecialchars($_SESSION['user']['nom']) ?></title>
</head>
<body>
    <div class="dashboard-container">
        <header class="dashboard-header">
            <div class="logo-container">
                <img src="../img/Logo.png" alt="CoVroom Logo" class="logo" />
                <p class="logoName">CoVroom</p>
            </div>
            <div class="user-info">
                <span><?= htmlspecialchars($_SESSION['user']['nom']) ?></span>
                <a href="../backend/routes/logout.php" class="logout-btn">Logout</a>
            </div>
        </header>
        <main class="dashboard-content">
            <h1>Welcome, <?= htmlspecialchars($_SESSION['user']['nom']) ?>!</h1>
            <div class="dashboard-actions">
                <?php if ($_SESSION['user']['role'] === 'conducteur'): ?>
                    <a href="publish_ride.php" class="btn">Offer a Ride</a>
                <?php endif; ?>
                <a href="search_rides.php" class="btn">Find a Ride</a>
            </div>
        </main>
    </div>
</body>
</html>
