<?php 
session_start();

// Générer le token CSRF s'il n'existe pas
if (!isset($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CoVroom - Login</title>
    <link rel="stylesheet" href="/Mini-Projet/Login/style.css">
    <script defer src="/Mini-Projet/Login/script.js"></script>
</head>
<body>
    <div class="container">
        <div class="left-side">
            <div class="logo-container">
                <img src="/Mini-Projet/img/Logo.png" alt="CoVroom Logo" class="logo">
                <p class="logoName">CoVroom</p>
            </div>
            <div class="head_sub">
                <h1 class="h1">Login to your account</h1>
                <p class="sub-head">Welcome back to CoVroom</p>
            </div>

            <?php if (isset($_SESSION['auth_message'])): ?>
                <div class="alert-message <?= $_SESSION['auth_message']['type'] ?? 'error' ?>">
                    <?= htmlspecialchars($_SESSION['auth_message']['text'] ?? '') ?>
                </div>
                <?php unset($_SESSION['auth_message']); ?>
            <?php endif; ?>

            <form action="/Mini-Projet/backend/routes/login.php" method="post">
                <input type="hidden" name="csrf_token" value="<?= htmlspecialchars($_SESSION['csrf_token']) ?>">

                <div class="input-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email"
                           value="<?= htmlspecialchars($_SESSION['form_data']['email'] ?? '') ?>"
                           placeholder="Enter your email" required autofocus>
                </div>

                <div class="input-group">
                    <label for="mot_de_passe">Password</label>
                    <input type="password" id="mot_de_passe" name="mot_de_passe"
                           placeholder="Enter your password" required>
                </div>

                <button type="submit" class="btn">Login</button>

                <p class="login-link">
                    Don't have an account? 
                    <a href="/Mini-Projet/views/register_form.php">Sign up</a>
                </p>
            </form>

            <?php unset($_SESSION['form_data']); ?>
        </div>

        <div class="right-side">
            <img src="/Mini-Projet/img/Side-img.png" alt="Person in a taxi">
        </div>
    </div>
</body>
</html>
