    </main>

    <footer id="colophon" class="site-footer">
        <div class="container">
            <div class="site-info">
                <p>&copy; <?php echo date('Y'); ?> <?php bloginfo('name'); ?>. <?php esc_html_e('Tous droits réservés.', 'onthemove'); ?></p>
                <p>
                    <?php
                    printf(
                        esc_html__('Propulsé par %s', 'onthemove'),
                        '<a href="' . esc_url(__('https://wordpress.org/', 'onthemove')) . '">WordPress</a>'
                    );
                    ?>
                </p>
            </div>
        </div>
    </footer>
</div>

<?php wp_footer(); ?>
</body>
</html>

