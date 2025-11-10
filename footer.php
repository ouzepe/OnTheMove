</main>

<footer class="footer" id="footer">
    <div class="footer-content">
        <div class="footer-content-left">
            <div class="footer-logo">
                <div class="logo-onthemove">
                    <picture>
                        <source media="(max-width: 600px)"
                            srcset="<?php echo get_template_directory_uri(); ?>/src/assets/LogoMobile.svg">
                        <img src="<?php echo get_template_directory_uri(); ?>/src/assets/headerLogoWithText.svg"
                            alt="Logo OnTheMove">
                    </picture>
                </div>
            </div>
        </div>
        <div class="footer-content-right">
            <div class="footer-content-right-menu">
                <?php
                wp_nav_menu(array(
                    'theme_location' => 'Footer',
                    'menu_id' => 'primary-menu',
                    'container' => false,
                    'menu_class' => 'primary-menu',
                ));
                ?>
            </div>
            <div class="footer-translations">
                <div class="footer-translations-fr">
                    <a href="<?php echo home_url(); ?>/"
                        style="<?php echo (get_locale() == 'en_US' || get_locale() == 'en_GB') ? 'color: var(--primary-red-transparent);' : ''; ?>">FR</a>
                </div>
                <!-- Separator -->
                <span class="footer-translations-separator">/</span>
                <div class="footer-translations-en">
                    <a href="<?php echo home_url(); ?>/en"
                        style="<?php echo (get_locale() == 'en_US' || get_locale() == 'en_GB') ? 'color: var(--primary-red-transparent);' : 'color: var(--primary-red-transparent);'; ?>">EN</a>
                </div>
            </div>
        </div>

    </div>

</footer>
</div>

<?php wp_footer(); ?>
</body>

</html>