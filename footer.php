    </main>

    <footer class="footer">
        <div class="footer-content">
            <div class="footer-content-left">
                <?php
                $footer_logo = get_theme_mod('footer_logo');
                if ($footer_logo) : ?>
                    <div class="footer-logo">
                        <img src="<?php echo esc_url($footer_logo); ?>" alt="<?php bloginfo('name'); ?>">
                    </div>
                <?php endif; ?>
            </div>
            <div class="footer-content-right">
                <h3>Contact Us</h3>
            </div>
        </div>
        
    </footer>
</div>

<?php wp_footer(); ?>
</body>
</html>

