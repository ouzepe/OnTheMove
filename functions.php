<?php
function mon_theme_enqueue_assets() {
    wp_enqueue_style('mon-theme-style', get_template_directory_uri() . '/dist/css/style.css', [], '1.0');
    wp_enqueue_script('mon-theme-script', get_template_directory_uri() . '/dist/js/main.js', [], '1.0', true);
}
add_action('wp_enqueue_scripts', 'mon_theme_enqueue_assets');

function register_my_menus() {
    register_nav_menus(
        array(
            'Footer' => __('Footer_Menu', 'onthemove'),
        )
    );
}
add_action('init', 'register_my_menus');