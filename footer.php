    </main>

    <footer class="footer" id="footer">
        <div class="footer-content">
            <div class="footer-content-left">
                <div class="footer-logo">
                    <img src="<?php echo esc_url(home_url('/wp-content/uploads/2025/11/OnTheMoveLogo.png')); ?>" alt="<?php bloginfo('name'); ?>">
                    <img src="<?php echo esc_url(home_url('/wp-content/uploads/2025/11/LogoBaseline.png')); ?>" alt="<?php bloginfo('name'); ?>">
                </div>
            </div>
            <div class="footer-content-right">
                
                <?php
                    wp_nav_menu(array(
                        'theme_location' => 'menu',
                        'menu_id'        => 'primary-menu',
                        'container'      => false,
                        'menu_class'     => 'primary-menu',
                    ));
                ?>
            </div>
        </div>
        
    </footer>
</div>

<?php wp_footer(); ?>
</body>
</html>

