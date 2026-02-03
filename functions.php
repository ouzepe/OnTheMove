<?php
function mon_theme_enqueue_assets()
{
    wp_enqueue_style('mon-theme-style', get_template_directory_uri() . '/dist/css/style.css', [], '1.0');

    // Charger main.js avec version dynamique pour forcer le rechargement
    // Charger main.js dans le HEAD pour ne pas dépendre du footer
    wp_enqueue_script('mon-theme-script', get_template_directory_uri() . '/dist/js/main.js', [], time(), false);
    wp_script_add_data('mon-theme-script', 'defer', true);

    // Debug: afficher dans la console PHP si le script est bien enqueued
    error_log('Main.js enqueued: ' . get_template_directory_uri() . '/dist/js/main.js');
}
add_action('wp_enqueue_scripts', 'mon_theme_enqueue_assets');

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

// Enqueue Leaflet for Interactive Map - MUST load BEFORE main.js
function theme_leaflet_script()
{
    // Charger seulement sur la page carte
    if (is_page_template('page-la-carte.php') || is_page('la-carte')) {
        // Charger Leaflet CSS
        wp_enqueue_style('leaflet-css', 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css');

        // Charger Leaflet JS dans le HEAD (avant main.js)
        wp_enqueue_script('leaflet-js', 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js', [], '1.9.4', false);

        // S'assurer que main.js se charge APRÈS Leaflet
        wp_script_add_data('mon-theme-script', 'defer', true);
    }
}
add_action('wp_enqueue_scripts', 'theme_leaflet_script', 5); // Priority 5 to load before mon_theme_enqueue_assets

// Add IM_Settings to page head
function add_im_settings_to_head()
{
    if (is_page_template('page-la-carte.php') || is_page('la-carte')) {
        ?>
        <script type="text/javascript">
            var IM_Settings = {
                imagePath: '<?php echo get_template_directory_uri() . '/src/assets/Map.svg'; ?>'
            };
            console.log('IM_Settings defined in head:', IM_Settings);
            console.log('Waiting for scripts to load...');

            // Check if Leaflet loads
            setTimeout(function () {
                console.log('After 2 seconds - Leaflet loaded?', typeof L);
                console.log('After 2 seconds - Map element exists?', !!document.getElementById('im-map'));
            }, 2000);
        </script>
        <?php
    }
}
add_action('wp_head', 'add_im_settings_to_head');

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

// Force eager loading for all images on all pages
add_filter('wp_lazy_loading_enabled', '__return_false');

// Force eager loading for all images in content
add_filter('wp_img_tag_add_loading_attr', function ($value, $image, $context) {
    return 'eager';
}, 10, 3);

// Add preload to videos and eager loading to media in content
add_filter('the_content', function ($content) {
    // Add loading="eager" to all images
    $content = preg_replace('/<img(?![^>]*loading=)/i', '<img loading="eager"', $content);

    // Add preload="metadata" to all videos
    $content = preg_replace('/<video(?![^>]*preload=)/i', '<video preload="metadata"', $content);

    // Add loading="eager" to iframes
    $content = preg_replace('/<iframe(?![^>]*loading=)/i', '<iframe loading="eager"', $content);

    return $content;
});