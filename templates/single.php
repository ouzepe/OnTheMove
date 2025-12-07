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

// Ne pas limiter les images - on les filtrera en JavaScript selon le format
// Desktop/tablette : images 1, 2, 3, 4 (index 0, 1, 2, 3)
// Mobile : images 1, 2, 5, 6 (index 0, 1, 4, 5)
?>

<div class="home-carousel-container">
    <div class="home-carousel-logo">
        <picture>
            <source media="(max-width: 600px)"
                srcset="<?php echo get_template_directory_uri(); ?>/src/assets/Carousel-logo.svg">
            <img src="<?php echo get_template_directory_uri(); ?>/src/assets/Carousel-logo.svg"
                alt="Logo Carousel OnTheMove">
        </picture>
        <div class="home-carousel-logo-text">
            <?php
            // Extraire le h2 du post_content
            if ($home_page && !empty($home_page->post_content)) {
                // Extraire le h2
                preg_match('/<h2[^>]*>(.*?)<\/h2>/is', $home_page->post_content, $h2_match);
                if (!empty($h2_match[1])) {
                    $h2_text = $h2_match[1];
                    // Remplacer la virgule suivie d'un espace par virgule + saut de ligne
                    $h2_text = preg_replace('/,\s+/', ',<br>', $h2_text);
                    echo '<h1>' . $h2_text . '</h1>';
                } else {
                    $title_text = $home_page->post_title;
                    // Remplacer la virgule suivie d'un espace par virgule + saut de ligne
                    $title_text = preg_replace('/,\s+/', ',<br>', $title_text);
                    echo '<h1>' . $title_text . '</h1>';
                }

                // Extraire les deux premiers paragraphes (après le h2)
                $content_after_h2 = '';
                if (!empty($h2_match[0])) {
                    $h2_position = strpos($home_page->post_content, $h2_match[0]);
                    if ($h2_position !== false) {
                        $content_after_h2 = substr($home_page->post_content, $h2_position + strlen($h2_match[0]));
                    }
                } else {
                    $content_after_h2 = $home_page->post_content;
                }

                preg_match_all('/<p[^>]*>(.*?)<\/p>/is', $content_after_h2, $p_matches);
                $paragraphs = !empty($p_matches[1]) ? $p_matches[1] : [];

                // Extraire le bouton (button ou a avec class button)
                $button_html = '';
                preg_match('/<button[^>]*>.*?<\/button>/is', $content_after_h2, $button_match);
                if (!empty($button_match[0])) {
                    $button_html = $button_match[0];
                } else {
                    // Essayer avec <a> qui pourrait être stylisé comme un bouton
                    preg_match('/<a[^>]*class="[^"]*button[^"]*"[^>]*>.*?<\/a>/is', $content_after_h2, $button_match);
                    if (!empty($button_match[0])) {
                        $button_html = $button_match[0];
                    }
                }

                // Afficher les deux paragraphes côte à côte
                if (!empty($paragraphs) && count($paragraphs) >= 2) {
                    echo '<div class="home-carousel-paragraphs">';
                    // Premier paragraphe à gauche
                    echo '<div class="home-carousel-paragraph-left"><p>' . wp_kses_post($paragraphs[0]) . '</p></div>';
                    // Deuxième paragraphe à droite
                    echo '<div class="home-carousel-paragraph-right"><p>' . wp_kses_post($paragraphs[1]) . '</p></div>';
                    echo '</div>';
                } elseif (!empty($paragraphs) && count($paragraphs) == 1) {
                    // Si un seul paragraphe, l'afficher quand même
                    echo '<div class="home-carousel-paragraphs">';
                    echo '<div class="home-carousel-paragraph-left"><p>' . wp_kses_post($paragraphs[0]) . '</p></div>';
                    echo '</div>';
                }

                // Afficher le bouton en bas
                if (!empty($button_html)) {
                    echo '<div class="home-carousel-button">' . wp_kses_post($button_html) . '</div>';
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
                // Calculer le nombre total d'images
                $total_images = count($carousel_images);
                // Calculer les index des 2 dernières images (les 2 dernières = index total-2 et total-1)
                $last_two_indexes = [];
                if ($total_images >= 2) {
                    $last_two_indexes[] = $total_images - 2; // Avant-dernière
                    $last_two_indexes[] = $total_images - 1; // Dernière
                }

                // Afficher toutes les images avec des attributs data pour le filtrage
                // Desktop/tablette : images 1, 2, 3, 4 (index 0, 1, 2, 3)
                // Mobile : 2 premières (index 0, 1) et 2 dernières (index total-2, total-1)
                foreach ($carousel_images as $index => $image) {
                    // Déterminer si visible en desktop (index 0-3)
                    $is_desktop_visible = ($index <= 3);
                    // Déterminer si visible en mobile : 2 premières (0, 1) ou 2 dernières
                    $is_mobile_visible = ($index == 0 || $index == 1 || in_array($index, $last_two_indexes));
                    ?>
                    <div class="swiper-slide" data-slide-index="<?php echo $index; ?>"
                        data-desktop-visible="<?php echo $is_desktop_visible ? 'true' : 'false'; ?>"
                        data-mobile-visible="<?php echo $is_mobile_visible ? 'true' : 'false'; ?>">
                        <img src="<?php echo esc_url($image['src']); ?>" alt="<?php echo esc_attr($image['alt']); ?>">
                    </div>
                    <?php
                }
            } else {
                // Fallback: afficher les 6 images du carousel depuis src/assets/carousel
                // On suppose qu'il y a au moins 6 images disponibles
                $total_images = 6;
                $last_two_indexes = [4, 5]; // Les 2 dernières (index 4 et 5 pour 6 images)
            
                for ($i = 1; $i <= 6; $i++) {
                    $image_url = get_template_directory_uri() . '/src/assets/carousel/carousel-img-' . $i . '.jpg';
                    $index = $i - 1; // Convertir en index 0-based
                    // Desktop/tablette : images 1, 2, 3, 4 (index 0, 1, 2, 3)
                    // Mobile : 2 premières (index 0, 1) et 2 dernières (index 4, 5)
                    $is_desktop_visible = ($index <= 3);
                    $is_mobile_visible = ($index == 0 || $index == 1 || in_array($index, $last_two_indexes));
                    ?>
                    <div class="swiper-slide" data-slide-index="<?php echo $index; ?>"
                        data-desktop-visible="<?php echo $is_desktop_visible ? 'true' : 'false'; ?>"
                        data-mobile-visible="<?php echo $is_mobile_visible ? 'true' : 'false'; ?>">
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