<?php
function mon_theme_enqueue_assets()
{
    wp_enqueue_style('mon-theme-style', get_template_directory_uri() . '/dist/css/style.css', [], '1.0');
    wp_enqueue_script('mon-theme-script', get_template_directory_uri() . '/dist/js/main.js', [], '1.0', true);
}
add_action('wp_enqueue_scripts', 'mon_theme_enqueue_assets');

function onthemove_enqueue_interactive_map_assets()
{
    if (!is_page_template('page-la-carte.php') && !is_page('la-carte')) {
        return;
    }

    $plugin_base = plugins_url('interactive-map/assets/');

    wp_enqueue_style('leaflet-css', 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css');
    wp_enqueue_script('leaflet-js', 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js', [], null, false);

    wp_enqueue_style('im-style', $plugin_base . 'style.css');
    wp_enqueue_script('im-script', $plugin_base . 'script.js', ['leaflet-js'], null, false);

    wp_localize_script('im-script', 'IM_Settings', [
        'imagePath' => get_template_directory_uri() . '/src/assets/Map.svg'
    ]);
}
add_action('wp_enqueue_scripts', 'onthemove_enqueue_interactive_map_assets');

function register_my_menus()
{
    register_nav_menus(
        array(
            'Header' => __('Header_Menu', 'onthemove'),
            'Footer' => __('Footer_Menu', 'onthemove'),
        )
    );
}
add_action('init', 'register_my_menus');

// wp_enqueue_script( $handle, $src, $deps, $ver, $in_footer );
function theme_gsap_script()
{
    // The core GSAP library
    wp_enqueue_script('gsap-js', 'https://cdn.jsdelivr.net/npm/gsap@3.14.1/dist/gsap.min.js', array(), false, true);
    // ScrollTrigger - with gsap.js passed as a dependency
    wp_enqueue_script('gsap-st', 'https://cdn.jsdelivr.net/npm/gsap@3.14.1/dist/ScrollTrigger.min.js', array('gsap-js'), false, true);
    // Your animation code file - with gsap.js passed as a dependency
    wp_enqueue_script('gsap-js2', get_template_directory_uri() . 'js/app.js', array('gsap-js'), false, true);
}

add_action('wp_enqueue_scripts', 'theme_gsap_script');

// Ajouter une classe body pour la page carte
function add_carte_body_class($classes)
{
    global $post;
    if (is_page() && isset($post->post_name) && $post->post_name == 'la-carte') {
        $classes[] = 'page-carte';
    }
    // Vérifier aussi par template
    if (is_page_template('page-la-carte.php')) {
        $classes[] = 'page-carte';
    }
    return $classes;
}
add_filter('body_class', 'add_carte_body_class');