<?php 
session_start();

// Génération du token CSRF
if (!isset($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CoVroom - Create Account</title>
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
                <h1 class="h1">Create your account</h1>
                <p class="sub-head">Welcome to CoVroom - let's get started</p>
            </div>

            <?php if (isset($_SESSION['auth_message'])): ?>
                <div class="alert-message <?= $_SESSION['auth_message']['type'] ?? 'error' ?>">
                    <?= htmlspecialchars($_SESSION['auth_message']['text'] ?? $_SESSION['auth_message']) ?>
                </div>
                <?php unset($_SESSION['auth_message']); ?>
            <?php endif; ?>

            <form action="http://localhost/Mini-Projet/backend/routes/register.php" method="post">


                <input type="hidden" name="csrf_token" value="<?= htmlspecialchars($_SESSION['csrf_token']) ?>">

                <div class="input-group">
                    <label for="name">Full Name</label>
                    <input type="text" id="name" name="nom" 
                        value="<?= htmlspecialchars($_SESSION['form_data']['nom'] ?? '') ?>" 
                        placeholder="Enter your full name" required>
                </div>

                <div class="input-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" 
                        value="<?= htmlspecialchars($_SESSION['form_data']['email'] ?? '') ?>" 
                        placeholder="Enter your email" required>
                </div>

                <div class="input-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="mot_de_passe" 
                        placeholder="Enter your password" required minlength="6">
                </div>

                <button type="submit" class="btn">Sign up</button>

                <p class="login-link">
                    Already have an account? 
                    <a href="/Mini-Projet/views/login_form.php">Log in</a>
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
