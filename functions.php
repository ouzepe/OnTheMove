<?php
function mon_theme_enqueue_assets()
{
    // Prefer build/ (push) if it exists, fallback to dist/ (dev)
    $asset_dir = file_exists(get_template_directory() . '/build/js/main.js') ? 'build' : 'dist';

    $css_file = get_template_directory() . '/' . $asset_dir . '/css/style.css';
    $js_file = get_template_directory() . '/' . $asset_dir . '/js/main.js';

    $css_ver = file_exists($css_file) ? filemtime($css_file) : '1.0';
    $js_ver = file_exists($js_file) ? filemtime($js_file) : '1.0';

    // Force version update pour bust le cache
    $css_ver .= '.2';
    $js_ver .= '.2';

    wp_enqueue_style('mon-theme-style', get_template_directory_uri() . '/' . $asset_dir . '/css/style.css', [], $css_ver);

    // Charger main.js avec version dynamique pour forcer le rechargement
    // Charger main.js dans le HEAD pour ne pas dépendre du footer
    wp_enqueue_script('mon-theme-script', get_template_directory_uri() . '/' . $asset_dir . '/js/main.js', [], $js_ver, false);
    wp_script_add_data('mon-theme-script', 'defer', true);

    // Debug: afficher dans la console PHP si le script est bien enqueued
    error_log('Main.js enqueued: ' . get_template_directory_uri() . '/' . $asset_dir . '/js/main.js');
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
        // Chercher la catégorie "carte" dans toutes les langues
        $carte_category = get_category_by_slug('carte');

        // Si Polylang est actif, récupérer aussi les traductions de la catégorie
        $category_ids = array();
        if ($carte_category) {
            $category_ids[] = $carte_category->term_id;

            // Ajouter les traductions si Polylang est actif
            if (function_exists('pll_get_term_translations')) {
                $translations = pll_get_term_translations($carte_category->term_id);
                if ($translations) {
                    $category_ids = array_merge($category_ids, array_values($translations));
                }
            }
        }

        $args = array(
            'post_type' => 'post',
            'posts_per_page' => -1,
            'category__in' => $category_ids,
        );

        $pins_query = new WP_Query($args);
        $pins_data = [];

        if ($pins_query->have_posts()) {
            while ($pins_query->have_posts()) {
                $pins_query->the_post();

                // Récupérer le contenu de l'article
                $content = get_the_content();

                // Extraire le premier h2
                preg_match('/<h2[^>]*>(.*?)<\/h2>/is', $content, $h2_match);
                $h2_title = !empty($h2_match[1]) ? strip_tags($h2_match[1]) : get_the_title();

                // Extraire tous les paragraphes <p>
                preg_match_all('/<p[^>]*>(.*?)<\/p>/is', $content, $p_matches);

                $x = null;
                $y = null;

                // Si on a au moins 2 paragraphes, les 2 derniers sont x et y
                if (!empty($p_matches[1]) && count($p_matches[1]) >= 2) {
                    $paragraphs = $p_matches[1];
                    $total = count($paragraphs);

                    // Avant-dernier paragraphe = x
                    $x_text = strip_tags($paragraphs[$total - 2]);
                    $x = (float) $x_text;

                    // Dernier paragraphe = y
                    $y_text = strip_tags($paragraphs[$total - 1]);
                    $y = (float) $y_text;
                }

                // Ajouter le pin seulement si x et y sont définis et valides
                if ($x !== null && $y !== null && $x > 0 && $y > 0) {
                    // Trouver la position du dernier groupe wp:group pour le retirer
                    $last_group_pos = strrpos($content, '<!-- wp:group');

                    if ($last_group_pos !== false) {
                        // Retirer seulement à partir du dernier groupe
                        $content_without_coords = substr($content, 0, $last_group_pos);
                    } else {
                        $content_without_coords = $content;
                    }

                    // Appliquer les filtres WordPress pour transformer TOUT le contenu Gutenberg en HTML
                    $full_html = apply_filters('the_content', $content_without_coords);

                    // ENSUITE, extraire l'image du HTML généré
                    preg_match('/<figure[^>]*class="[^"]*wp-block-image[^"]*"[^>]*>.*?<\/figure>/is', $full_html, $image_match);
                    $image_html = $image_match[0] ?? '';

                    // Retirer l'image du HTML pour avoir le reste du contenu
                    $content_html = preg_replace('/<figure[^>]*class="[^"]*wp-block-image[^"]*"[^>]*>.*?<\/figure>/is', '', $full_html, 1);

                    // Vérifier si le bouton a un href vide ou inexistant
                    $has_button_link = true;
                    if (preg_match('/<a[^>]*class="[^"]*wp-block-button__link[^"]*"[^>]*href="([^"]*)"/', $content_html, $href_match)) {
                        $href = trim($href_match[1]);
                        if (empty($href) || $href === '#') {
                            $has_button_link = false;
                            // Ajouter la classe disabled au bouton
                            $content_html = preg_replace(
                                '/(<a[^>]*class="[^"]*wp-block-button__link[^"]*")/',
                                '$1 disabled-button',
                                $content_html
                            );
                        }
                    }

                    $pins_data[] = [
                        'x' => $x,
                        'y' => $y,
                        'site_title' => get_the_title(), // Titre du site (titre de l'article)
                        'tooltip_title' => $h2_title, // Titre du tooltip (h2)
                        'image' => $image_html, // Image extraite
                        'groups' => [$content_html], // Tout le contenu restant (h2, paragraphes, liste, bouton)
                    ];
                }
            }
            wp_reset_postdata();
        }

        ?>
        <script type="text/javascript">
            var IM_Settings = {
                imagePath: '<?php echo get_template_directory_uri() . '/src/assets/Map.svg'; ?>',
                pins: <?php echo json_encode($pins_data); ?>
            };


            // Check if Leaflet loads
            setTimeout(function () {

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

/**
 * URL de page chapitre sans date (évite le permalink du post « chapitre »).
 */
function onthemove_get_chapter_page_url($subtitle, $chapter_post_id = 0)
{
    $slug = !empty($subtitle) ? sanitize_title($subtitle) : '';
    if (empty($slug) && $chapter_post_id) {
        $slug = get_post_field('post_name', $chapter_post_id);
    }
    if (empty($slug)) {
        return home_url('/');
    }

    $target_page = get_page_by_path($slug);

    if (!$target_page) {
        $pages = get_posts(array(
            'post_type' => 'page',
            'name' => $slug,
            'post_status' => 'publish',
            'posts_per_page' => 1,
        ));
        if (!empty($pages)) {
            $target_page = $pages[0];
        }
    }

    if (!$target_page && !empty($subtitle)) {
        $target_page = get_page_by_title($subtitle);
    }

    if (!$target_page) {
        $template_pages = get_posts(array(
            'post_type' => 'page',
            'post_status' => 'publish',
            'posts_per_page' => 1,
            'meta_key' => '_wp_page_template',
            'meta_value' => 'page-' . $slug . '.php',
        ));
        if (!empty($template_pages)) {
            $target_page = $template_pages[0];
        }
    }

    if ($target_page) {
        $page_id = $target_page->ID;
        if (function_exists('pll_get_post')) {
            $translated_id = pll_get_post($page_id);
            if ($translated_id) {
                $page_id = $translated_id;
            }
        }
        return get_permalink($page_id);
    }

    return home_url('/' . $slug . '/');
}