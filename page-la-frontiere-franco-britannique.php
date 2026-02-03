<?php
/**
 * Template Name: La frontiere franco-britannique
 * Template pour la page "La frontiere franco-britannique"
 *
 * Ce template sera automatiquement utilisé par WordPress
 * si le slug de la page est "la-frontiere-franco-britannique"
 */

get_header();
?>

<?php
while (have_posts()):
    the_post();
    ?>

    <div class="page-template-page-frontiere-franco-britannique">
        <div class="chiffres-disparus-container-image">
            <?php
            $post_content = get_the_content();
            if (preg_match('/<img[^>]*class=["\']([^"\']+)["\'][^>]*src=["\']([^"\']+)["\'][^>]*>/i', $post_content, $img_matches)) {
                $img_class = $img_matches[1];
                $img_src = $img_matches[2];
                if (preg_match('/wp-image-(\d+)/', $img_class, $id_matches)) {
                    $attachment_id = (int) $id_matches[1];
                    echo wp_get_attachment_image($attachment_id, 'full', false, array('loading' => 'eager'));
                } else {
                    echo '<img src="' . esc_url($img_src) . '" alt="" loading="eager" />';
                }
            } elseif (preg_match('/<img[^>]+src=["\']([^"\']+)["\'][^>]*>/i', $post_content, $img_matches)) {
                echo '<img src="' . esc_url($img_matches[1]) . '" alt="" loading="eager" />';
            }
            ?>
        </div>
        <div class="chiffres-disparus-container-carousel">
            <div class="chiffres-disparus-container-carousel-text">
                <div class="chiffres-disparus-container-carousel-title">
                    <?php
                    $post_content = get_the_content();
                    if (preg_match('/<h2[^>]*>(.*?)<\/h2>/is', $post_content, $h2_matches)) {
                        echo '<h2>' . wp_kses_post($h2_matches[1]) . '</h2>';
                    }
                    ?>
                </div>
                <div class="chiffres-disparus-container-carousel-chapter">
                    <?php
                    $post_content = get_the_content();
                    if (preg_match('/<h6[^>]*>(.*?)<\/h6>/is', $post_content, $h6_matches)) {
                        echo '<h6> - ' . wp_kses_post($h6_matches[1]) . '</h6>';
                    }
                    ?>
                </div>
            </div>
            <div class="chiffres-disparus-container-carousel-arrow">
                <a class="carousel-arrow-icon is-disabled" href="#" aria-disabled="true" tabindex="-1">
                    <img src="<?php echo get_template_directory_uri(); ?>/src/assets/arrow-left.svg" alt="" />
                </a>
                <a class="carousel-arrow-icon" href="<?php echo esc_url(home_url('/les-chiffres-des-disparus/')); ?>">
                    <img src="<?php echo get_template_directory_uri(); ?>/src/assets/arrow-right.svg" alt="" />
                </a>
            </div>
        </div>
        <div class="chiffres-disparus-container-content">
            <h1><?php the_title(); ?></h1>
            <?php
            $post_content = get_the_content();
            if (preg_match('/<p[^>]*>(.*?)<\/p>/is', $post_content, $p_matches)) {
                echo '<p class="description">' . wp_kses_post($p_matches[1]) . '</p>';
            }
            ?>
            <?php
            if (preg_match_all('/<p[^>]*>(.*?)<\/p>/is', $post_content, $p_matches)) {
                if (isset($p_matches[1][1])) {
                    echo '<p class="written-by">' . wp_kses_post($p_matches[1][1]) . '</p>';
                }
            }
            ?>
            <div class="franco-britannique-container-content-middle">
                <div>
                    <div class="map-container">
                        <?php echo do_shortcode('[wp_mapit_map id="548"]'); ?>
                    </div>
                    <div class="side-text">
                        <?php
                        // Extract map legend content starting from "Carte du littoral"
                        $post_content = get_the_content();

                        // Find the section between "Carte du littoral" and the first wp:group
                        if (preg_match('/<!-- wp:heading -->\s*<h2[^>]*>Carte du littoral<\/h2>.*?(?=<!-- wp:group {"layout":{"type":"constrained"}} -->)/is', $post_content, $legend_match)) {
                            $legend_content = $legend_match[0];

                            echo '<div class="map-legend">';
                            echo '<div class="legend-content">';

                            // Extract h2 title
                            if (preg_match('/<h2[^>]*>(.*?)<\/h2>/is', $legend_content, $title_match)) {
                                echo '<h2 class="map-legend-title">' . wp_kses_post($title_match[1]) . '</h2>';
                            }

                            // Parse structure: IMAGE followed by LABEL (paragraph)
                            preg_match_all('/<p[^>]*>(.*?)<\/p>|<figure[^>]*>.*?<img[^>]*src=["\']([^"\']+)["\'][^>]*>.*?<\/figure>/is', $legend_content, $items_matches, PREG_SET_ORDER);

                            $current_category = '';
                            $items = [];
                            $pending_image = '';

                            foreach ($items_matches as $item) {
                                if (!empty($item[1])) {
                                    // It's a paragraph
                                    $text = trim(strip_tags($item[1]));

                                    // Check if it's a category title
                                    if (in_array($text, ['Territoire', 'Infrastructures', 'Effectifs et dispositifs', 'Événements marquants'])) {
                                        // Output previous category if exists
                                        if ($current_category && !empty($items)) {
                                            echo '<div class="legend-category">';
                                            echo '<h3 class="legend-category-title">' . esc_html($current_category) . '</h3>';
                                            echo '<div class="legend-items">';
                                            foreach ($items as $legend_item) {
                                                if (!empty($legend_item['label']) && !empty($legend_item['icon'])) {
                                                    echo '<div class="legend-item">';
                                                    echo '<img src="' . esc_url($legend_item['icon']) . '" alt="" class="legend-icon" loading="eager" />';
                                                    echo '<span class="legend-label">' . esc_html($legend_item['label']) . '</span>';
                                                    echo '</div>';
                                                }
                                            }
                                            echo '</div>';
                                            echo '</div>';
                                        }
                                        $current_category = $text;
                                        $items = [];
                                        $pending_image = '';
                                    } else {
                                        // It's an item label for the previous image
                                        if (!empty($pending_image)) {
                                            $items[] = ['label' => $text, 'icon' => $pending_image];
                                            $pending_image = '';
                                        }
                                    }
                                } elseif (!empty($item[2])) {
                                    // It's an image, store it for the next paragraph (label)
                                    $pending_image = $item[2];
                                }
                            }

                            // Output last category
                            if ($current_category && !empty($items)) {
                                echo '<div class="legend-category">';
                                echo '<h3 class="legend-category-title">' . esc_html($current_category) . '</h3>';
                                echo '<div class="legend-items">';
                                foreach ($items as $legend_item) {
                                    if (!empty($legend_item['label']) && !empty($legend_item['icon'])) {
                                        echo '<div class="legend-item">';
                                        echo '<img src="' . esc_url($legend_item['icon']) . '" alt="" class="legend-icon" loading="eager" />';
                                        echo '<span class="legend-label">' . esc_html($legend_item['label']) . '</span>';
                                        echo '</div>';
                                    }
                                }
                                echo '</div>';
                                echo '</div>';
                            }

                            echo '</div>'; // Close legend-content
                    
                            // Add scroll indicator / toggle button (outside of scrollable content, stays fixed)
                            echo '<button class="legend-scroll-indicator" aria-label="Toggle legend">';
                            echo '<svg width="20" height="12" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">';
                            echo '<path d="M10 12L0 2L2 0L10 7.5L18 0L20 2L10 12Z" fill="#4A0B24" opacity="0.5"/>';
                            echo '</svg>';
                            echo '</button>';

                            echo '</div>'; // Close map-legend
                        }
                        ?>
                    </div>
                </div>
            </div>

        </div>
        <div class="frontiere-franco-britannique-first-group">
            <?php
            // Extract all wp-block-group blocks with nested content
            $post_content = get_the_content();
            preg_match_all('/<!-- wp:group.*?-->.*?<!-- \/wp:group -->/is', $post_content, $group_matches);
            ?>

            <div class="frontiere-franco-britannique-groups-container">
                <div class="frontiere-franco-britannique-groups-left">
                    <?php
                    if (isset($group_matches[0][0])) {
                        echo '<div class="frontiere-franco-britannique-group-content-1">' . apply_filters('the_content', $group_matches[0][0]) . '</div>';
                    }
                    ?>
                    <?php
                    if (isset($group_matches[0][1])) {
                        echo '<div class="frontiere-franco-britannique-group-content-2">' . apply_filters('the_content', $group_matches[0][1]) . '</div>';
                    }
                    ?>
                    <?php
                    if (isset($group_matches[0][2])) {
                        echo '<div class="frontiere-franco-britannique-group-content-3">' . apply_filters('the_content', $group_matches[0][2]) . '</div>';
                    }
                    ?>
                </div>

                <div class="frontiere-franco-britannique-groups-right">
                    <?php
                    if (isset($group_matches[0][3])) {
                        echo '<div class="frontiere-franco-britannique-group-content-4">' . apply_filters('the_content', $group_matches[0][3]) . '</div>';
                    }
                    ?>
                </div>
            </div>

            <div class="frontiere-franco-britannique-groups-container frontiere-franco-britannique-groups-container-2">
                <div class="frontiere-franco-britannique-groups-left">
                    <?php
                    if (isset($group_matches[0][4])) {
                        echo '<div class="frontiere-franco-britannique-group-content-5">' . apply_filters('the_content', $group_matches[0][4]) . '</div>';
                    }
                    ?>
                </div>

                <div class="frontiere-franco-britannique-groups-right">
                    <?php
                    if (isset($group_matches[0][5])) {
                        echo '<div class="frontiere-franco-britannique-group-content-6">' . apply_filters('the_content', $group_matches[0][5]) . '</div>';
                    }
                    ?>
                    <?php
                    if (isset($group_matches[0][6])) {
                        echo '<div class="frontiere-franco-britannique-group-content-7">' . apply_filters('the_content', $group_matches[0][6]) . '</div>';
                    }
                    ?>
                </div>
            </div>

        </div>

        <div class="frontiere-franco-britannique-third-group">
            <?php
            if (isset($group_matches[0][7])) {
                echo '<div class="frontiere-franco-britannique-group-content-8">' . apply_filters('the_content', $group_matches[0][7]) . '</div>';
            }
            ?>
        </div>

        <div class="frontiere-franco-britannique-fourth-group">
            <div class="frontiere-franco-britannique-groups-container frontiere-franco-britannique-groups-container-4">
                <div class="frontiere-franco-britannique-groups-left">
                    <?php
                    if (isset($group_matches[0][8])) {
                        echo '<div class="frontiere-franco-britannique-group-content-9">' . apply_filters('the_content', $group_matches[0][8]) . '</div>';
                    }
                    ?>
                    <?php
                    if (isset($group_matches[0][9])) {
                        echo '<div class="frontiere-franco-britannique-group-content-10">' . apply_filters('the_content', $group_matches[0][9]) . '</div>';
                    }
                    ?>
                    <?php
                    if (isset($group_matches[0][10])) {
                        echo '<div class="frontiere-franco-britannique-group-content-11">' . apply_filters('the_content', $group_matches[0][10]) . '</div>';
                    }
                    ?>
                </div>

                <div class="frontiere-franco-britannique-groups-right">
                    <?php
                    if (isset($group_matches[0][11])) {
                        echo '<div class="frontiere-franco-britannique-group-content-12">' . apply_filters('the_content', $group_matches[0][11]) . '</div>';
                    }
                    ?>
                </div>
            </div>
        </div>

        <div class="frontiere-franco-britannique-fifth-group">
            <div class="frontiere-franco-britannique-groups-container frontiere-franco-britannique-groups-container-5">
                <div class="frontiere-franco-britannique-groups-left">
                    <?php
                    if (isset($group_matches[0][11])) {
                        echo '<div class="frontiere-franco-britannique-group-content-12">' . apply_filters('the_content', $group_matches[0][12]) . '</div>';
                    }
                    ?>
                </div>

                <div class="frontiere-franco-britannique-groups-right">
                    <?php
                    if (isset($group_matches[0][12])) {
                        echo '<div class="frontiere-franco-britannique-group-content-13">' . apply_filters('the_content', $group_matches[0][13]) . '</div>';
                    }
                    ?>
                    <?php
                    if (isset($group_matches[0][13])) {
                        echo '<div class="frontiere-franco-britannique-group-content-14">' . apply_filters('the_content', $group_matches[0][14]) . '</div>';
                    }
                    ?>
                    <?php
                    if (isset($group_matches[0][14])) {
                        echo '<div class="frontiere-franco-britannique-group-content-15">' . apply_filters('the_content', $group_matches[0][15]) . '</div>';
                    }
                    ?>
                </div>
            </div>
        </div>

        <div class="frontiere-franco-britannique-sixth-group-carousel">
            <?php
            // Debug: check how many groups we have
            $total_groups = isset($group_matches[0]) ? count($group_matches[0]) : 0;

            if (isset($group_matches[0][16])) {
                $carousel_content = $group_matches[0][16];

                echo '<div class="carousel-container">';

                // Apply filters to get the rendered content
                $rendered_content = apply_filters('the_content', $carousel_content);

                // Extract h3
                if (preg_match('/<h3[^>]*>(.*?)<\/h3>/is', $rendered_content, $h3_matches)) {
                    echo '<div class="carousel-header">';
                    echo '<h3>' . wp_kses_post($h3_matches[1]) . '</h3>';
                    echo '<div class="carousel-arrows">';
                    echo '<button class="carousel-arrow carousel-arrow-left" aria-label="Previous">';
                    echo '<img src="' . get_template_directory_uri() . '/src/assets/arrow-left.svg" alt="Previous" loading="eager" />';
                    echo '</button>';
                    echo '<button class="carousel-arrow carousel-arrow-right" aria-label="Next">';
                    echo '<img src="' . get_template_directory_uri() . '/src/assets/arrow-right.svg" alt="Next" loading="eager" />';
                    echo '</button>';
                    echo '</div>';
                    echo '</div>';
                }

                // Extract all figures with images and their following paragraphs
                if (preg_match_all('/<figure[^>]*>.*?<\/figure>\s*<p>(.*?)<\/p>/is', $rendered_content, $figure_matches)) {
                    echo '<div class="carousel-images">';
                    foreach ($figure_matches[0] as $index => $figure_and_p) {
                        $active_class = $index === 0 ? ' active' : '';
                        echo '<div class="carousel-slide' . $active_class . '" data-index="' . $index . '">';
                        echo $figure_and_p;
                        echo '</div>';
                    }
                    echo '</div>';
                } elseif (preg_match_all('/<figure[^>]*>.*?<img[^>]+>.*?<\/figure>/is', $rendered_content, $figure_only_matches)) {
                    // Fallback: just figures without paragraphs
                    echo '<div class="carousel-images">';
                    foreach ($figure_only_matches[0] as $index => $figure_tag) {
                        $active_class = $index === 0 ? ' active' : '';
                        echo '<div class="carousel-slide' . $active_class . '" data-index="' . $index . '">';
                        echo $figure_tag;
                        echo '</div>';
                    }
                    echo '</div>';
                }

                echo '</div>';
            } else {
                echo '<!-- Debug: group_matches[0][16] not found. Total groups: ' . $total_groups . ' -->';
            }
            ?>
        </div>

        <div class="disparus-enquete-cards">
            <div class="disparus-enquete-cards-title">
                <?php echo (function_exists('pll_current_language') && pll_current_language() === 'en') ? 'Read the next chapter' : 'Lire le chapitre suivant'; ?>
            </div>
            <?php
            $chapter_args = array(
                'post_type' => 'post',
                'posts_per_page' => 1,
                'category_name' => 'chapitre',
                'orderby' => 'date',
                'order' => 'ASC',
                's' => 'Le chiffres des disparus'
            );
            $chapter_query = new WP_Query($chapter_args);
            if ($chapter_query->have_posts()):
                while ($chapter_query->have_posts()):
                    $chapter_query->the_post();
                    ?>
                    <div class="chapterCard">
                        <div class="chapterCard-left">
                            <div class="chapterCard-title">
                                <?php
                                $post_content = get_the_content();
                                if (preg_match('/<h2[^>]*>(.*?)<\/h2>/is', $post_content, $h2_matches)) {
                                    echo strip_tags($h2_matches[1]);
                                }
                                ?>
                            </div>
                            <div class="chapterCard-subtitle">
                                <?php
                                if (preg_match('/<h3[^>]*>(.*?)<\/h3>/is', $post_content, $h3_matches)) {
                                    echo strip_tags($h3_matches[1]);
                                }
                                ?>
                            </div>
                            <div class="chapterCard-text">
                                <?php
                                $post_content = get_the_content();
                                if (preg_match('/<p[^>]*>(.*?)<\/p>/is', $post_content, $p_matches)) {
                                    echo strip_tags($p_matches[1]);
                                }
                                ?>
                            </div>
                            <div class="chapterCard-cta">
                                <?php
                                $contexte_page = get_page_by_title('les chiffres des disparus');
                                $contexte_url = $contexte_page ? get_permalink($contexte_page) : get_permalink();
                                ?>
                                <a href="<?php echo esc_url($contexte_url); ?>">
                                    <span><?php echo (function_exists('pll_current_language') && pll_current_language() === 'en') ? 'Read more' : 'Lire la suite'; ?></span>
                                    <img src="<?php echo get_template_directory_uri(); ?>/src/assets/arrow-right.svg" alt=""
                                        loading="eager" />
                                </a>
                            </div>
                        </div>
                        <div class="chapterCard-right">
                            <?php
                            $post_content = get_the_content();
                            if (preg_match('/<img[^>]+src=["\']([^"\']+)["\'][^>]*>/i', $post_content, $img_matches)) {
                                echo '<img src="' . esc_url($img_matches[1]) . '" alt="" loading="eager" />';
                            }
                            ?>
                        </div>
                    </div>
                    <?php
                endwhile;
                wp_reset_postdata();
            endif;
            ?>
        </div>
    </div>
    <?php
endwhile;
?>

<?php get_footer(); ?>