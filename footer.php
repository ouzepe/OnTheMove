</main>

<footer class="footer" id="footer">
    <?php if (!is_page('press')): ?>
        <div class="footer-press">
            <div class="footer-press-title">
                <h3>Ils ont publié nos articles</h3>
            </div>
            <div class="footer-press-link">
                <a href="<?php echo home_url('/press'); ?>">Voir nos articles de presse</a>
            </div>
            <div class="footer-press-logo">
                <?php
                // Get the press article post
                $press_post = get_page_by_path('/ils-ont-publie-nos-articles', OBJECT, 'post');

                if ($press_post) {
                    // Get the post content or custom field with press logos
                    $press_content = apply_filters('the_content', $press_post->post_content);
                    echo $press_content;
                }
                ?>
            </div>
        </div>
    <?php endif; ?>
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
                        style="<?php echo (get_locale() == 'en_US') ? 'color: #A58491;' : ''; ?>">FR</a>
                </div>
                <!-- Separator -->
                <span class="footer-translations-separator">/</span>
                <div class="footer-translations-en">
                    <a href="<?php echo home_url(); ?>/en"
                        style="<?php echo (get_locale() == 'en_US') ? '' : 'color: #A58491;'; ?>">EN</a>
                </div>
            </div>
        </div>

    </div>

</footer>
</div>

<?php wp_footer(); ?>
</body>

</html>