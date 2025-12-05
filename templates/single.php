<?php
/**
 * Template pour la page d'accueil avec carousel Swiper
 */
get_header();

// Récupérer les données de la page d'accueil
$home_page = get_page_by_path('home');
if (!$home_page) {
    // Si pas trouvé par slug, essayer de récupérer la page définie comme page d'accueil
    $home_page_id = get_option('page_on_front');
    if ($home_page_id) {
        $home_page = get_post($home_page_id);
    }
}

// Debug: afficher les données dans la console
if ($home_page) {
    echo '<script>console.log(' . json_encode([
        'page_data' => [
            'ID' => $home_page->ID,
            'post_title' => $home_page->post_title,
            'post_content' => $home_page->post_content,
            'post_excerpt' => $home_page->post_excerpt,
            'post_status' => $home_page->post_status,
            'post_type' => $home_page->post_type,
        ],
        'page_meta' => get_post_meta($home_page->ID),
        'page_url' => get_permalink($home_page->ID),
    ]) . ');</script>';
}

// Extraire les images du post_content
$carousel_images = [];
if ($home_page && !empty($home_page->post_content)) {
    // Utiliser une expression régulière pour extraire les balises img
    preg_match_all('/<img[^>]+>/i', $home_page->post_content, $img_tags);
    
    if (!empty($img_tags[0])) {
        foreach ($img_tags[0] as $img_tag) {
            // Extraire l'attribut src
            preg_match('/src="([^"]+)"/i', $img_tag, $src_match);
            // Extraire l'attribut alt (optionnel)
            preg_match('/alt="([^"]*)"/i', $img_tag, $alt_match);
            
            if (!empty($src_match[1])) {
                $carousel_images[] = [
                    'src' => $src_match[1],
                    'alt' => !empty($alt_match[1]) ? $alt_match[1] : 'Carousel image'
                ];
            }
        }
    }
}
?>

<div class="home-carousel-container">
    <div class="home-carousel-logo">
        <picture>
            <source media="(max-width: 600px)"
                srcset="<?php echo get_template_directory_uri(); ?>/src/assets/Carousel-logo.svg">
            <img src="<?php echo get_template_directory_uri(); ?>/src/assets/Carousel-logo.svg" alt="Logo Carousel OnTheMove">
        </picture>
        <div class="home-carousel-logo-text">
            <?php
            // Extraire le h2 du post_content
            if ($home_page && !empty($home_page->post_content)) {
                preg_match('/<h2[^>]*>(.*?)<\/h2>/is', $home_page->post_content, $h2_match);
                if (!empty($h2_match[1])) {
                    echo '<h1>' . $h2_match[1] . '</h1>';
                } else {
                    echo '<h1>' . $home_page->post_title . '</h1>';
                }
            } else {
                echo '<h1>' . $home_page->post_title . '</h1>';
            }
            ?>
        </div>
    </div>
    <div class="swiper home-swiper">
        <div class="swiper-wrapper">
            <?php
            if (!empty($carousel_images)) {
                // Afficher les images extraites du post_content
                foreach ($carousel_images as $index => $image) {
                    ?>
                    <div class="swiper-slide">
                        <img src="<?php echo esc_url($image['src']); ?>" alt="<?php echo esc_attr($image['alt']); ?>">
                    </div>
                    <?php
                }
            } else {
                // Fallback: afficher les 4 images du carousel depuis src/assets/carousel
                for ($i = 1; $i <= 4; $i++) {
                    $image_url = get_template_directory_uri() . '/src/assets/carousel/carousel-img-' . $i . '.jpg';
                    ?>
                    <div class="swiper-slide">
                        <img src="<?php echo esc_url($image_url); ?>" alt="Slide <?php echo $i; ?>">
                    </div>
                    <?php
                }
            }
            ?>
        </div>
        <div class="swiper-pagination"></div>
    </div>
</div>