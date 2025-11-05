<?php
/**
 * Fonctions du thème OnTheMove
 */

// Enqueue des assets (CSS et JS)
function mon_theme_enqueue_assets() {
    wp_enqueue_style('mon-theme-style', get_template_directory_uri() . '/dist/css/style.css', [], '1.0');
    wp_enqueue_script('mon-theme-script', get_template_directory_uri() . '/dist/js/main.js', [], '1.0', true);
}
add_action('wp_enqueue_scripts', 'mon_theme_enqueue_assets');

// Support du thème
function onthemove_theme_support() {
    // Support des titres automatiques
    add_theme_support('title-tag');
    
    // Support des images mises en avant
    add_theme_support('post-thumbnails');
    
    // Support du logo personnalisé
    add_theme_support('custom-logo', array(
        'height'      => 100,
        'width'       => 400,
        'flex-height' => true,
        'flex-width'  => true,
    ));
    
    // Support HTML5
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
    ));
    
    // Support des formats de posts
    add_theme_support('post-formats', array(
        'aside',
        'image',
        'video',
        'quote',
        'link',
    ));
    
    // Support du RSS automatique
    add_theme_support('automatic-feed-links');
}
add_action('after_setup_theme', 'onthemove_theme_support');

// Enregistrement des menus
function onthemove_register_menus() {
    register_nav_menus(array(
        'menu-1' => esc_html__('Menu Principal', 'onthemove'),
        'menu-footer' => esc_html__('Menu Footer', 'onthemove'),
    ));
}
add_action('init', 'onthemove_register_menus');

// Enregistrement des zones de widgets
function onthemove_widgets_init() {
    register_sidebar(array(
        'name'          => esc_html__('Barre latérale', 'onthemove'),
        'id'            => 'sidebar-1',
        'description'   => esc_html__('Ajoutez des widgets ici.', 'onthemove'),
        'before_widget' => '<section id="%1$s" class="widget %2$s">',
        'after_widget'  => '</section>',
        'before_title'  => '<h2 class="widget-title">',
        'after_title'   => '</h2>',
    ));
    
    register_sidebar(array(
        'name'          => esc_html__('Footer 1', 'onthemove'),
        'id'            => 'footer-1',
        'description'   => esc_html__('Widgets du footer (colonne 1)', 'onthemove'),
        'before_widget' => '<section id="%1$s" class="widget %2$s">',
        'after_widget'  => '</section>',
        'before_title'  => '<h2 class="widget-title">',
        'after_title'   => '</h2>',
    ));
    
    register_sidebar(array(
        'name'          => esc_html__('Footer 2', 'onthemove'),
        'id'            => 'footer-2',
        'description'   => esc_html__('Widgets du footer (colonne 2)', 'onthemove'),
        'before_widget' => '<section id="%1$s" class="widget %2$s">',
        'after_widget'  => '</section>',
        'before_title'  => '<h2 class="widget-title">',
        'after_title'   => '</h2>',
    ));
}
add_action('widgets_init', 'onthemove_widgets_init');

// Personnalisation de la longueur de l'extrait
function onthemove_excerpt_length($length) {
    return 40;
}
add_filter('excerpt_length', 'onthemove_excerpt_length');

// Personnalisation du texte "Lire la suite"
function onthemove_excerpt_more($more) {
    return '...';
}
add_filter('excerpt_more', 'onthemove_excerpt_more');
