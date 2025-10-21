<nav>
    <div class="nav-container">
        <div class="nav-logo">
            <img src="img/dbell.png" alt="Logo" class="logonav">
        </div>
        <div class="nav-profile">
            <span class="nav-profile-name">
                Welcome, <?php echo htmlspecialchars($userData['name']); ?>
            </span>
            <a href="logout.php" class="nav-profile-cart" title="Logout">
                <i class="fas fa-sign-out-alt"></i>
            </a>
        </div>
    </div>
</nav>