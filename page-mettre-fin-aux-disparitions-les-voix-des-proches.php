<?php
/**
 * Template Name: Mettre fin aux disparitions - Les voix des proches
 * Template pour la page "Mettre fin aux disparitions - Les voix des proches"
 *
 * Ce template sera automatiquement utilisé par WordPress
 * si le slug de la page est "mettre-fin-aux-disparitions-les-voix-des-proches"
 */
get_header();
?>

<?php
while (have_posts()):
    the_post();
    ?>

    <div class="page-template-page-contexte-des-disparitions page-template-page-chiffres-disparus">
        <div class="chiffres-disparus-container-image">
            <?php
            $post_content = get_the_content();
            if (preg_match('/<img[^>]*class=["\']([^"\']+)["\'][^>]*src=["\']([^"\']+)["\'][^>]*>/i', $post_content, $img_matches)) {
                $img_class = $img_matches[1];
                $img_src = $img_matches[2];
                if (preg_match('/wp-image-(\d+)/', $img_class, $id_matches)) {
                    $attachment_id = (int) $id_matches[1];
                    echo wp_get_attachment_image($attachment_id, 'full');
                } else {
                    echo '<img src="' . esc_url($img_src) . '" alt="" />';
                }
            } elseif (preg_match('/<img[^>]+src=["\']([^"\']+)["\'][^>]*>/i', $post_content, $img_matches)) {
                echo '<img src="' . esc_url($img_matches[1]) . '" alt="" />';
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
                <a class="carousel-arrow-icon" href="<?php echo esc_url(home_url('/les-disparus/')); ?>">
                    <img src="<?php echo get_template_directory_uri(); ?>/src/assets/arrow-left.svg" alt="" />
                </a>
                <a class="carousel-arrow-icon is-disabled" href="<?php echo esc_url(home_url('/le-memorial/')); ?>">
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
            <?php
            // Extract all wp-block-group blocks with nested content
            $post_content = get_the_content();
            preg_match_all('/<!-- wp:group.*?-->.*?<!-- \/wp:group -->/is', $post_content, $group_matches);
            ?>

            <div class="contexte-disparus-container-content-middle">
                <?php
                // Display first two groups side by side
                if (isset($group_matches[0][0]) && isset($group_matches[0][1])) {
                    echo '<div class="contexte-groups-wrapper">';
                    echo '<div class="contexte-group-left">' . apply_filters('the_content', $group_matches[0][0]) . '</div>';
                    echo '<div class="contexte-group-right">' . apply_filters('the_content', $group_matches[0][1]) . '</div>';
                    echo '</div>';
                }
                ?>
            </div>

        </div>
        <?php
        // Display third group if exists - outside main container for full width
        if (isset($group_matches[0][2])) {
            echo '<div class="contexte-group-bottom-wrapper"><div class="contexte-group-bottom contexte-group-bottom--first">' . apply_filters('the_content', $group_matches[0][2]) . '</div></div>';
        }

        // Display groups 4 through 9 in a single wrapper with background
        if (
            isset($group_matches[0][3]) || isset($group_matches[0][4]) || isset($group_matches[0][5]) ||
            isset($group_matches[0][6]) || isset($group_matches[0][7]) || isset($group_matches[0][8]) ||
            isset($group_matches[0][9])
        ) {
            echo '<div class="contexte-group-combined-wrapper">';

            // Display fourth and fifth groups side by side if they exist
            if (isset($group_matches[0][3]) && isset($group_matches[0][4])) {
                echo '<div class="contexte-group-secondary-wrapper">';
                echo '<div class="contexte-groups-secondary">';
                echo '<div class="contexte-group-secondary-left">' . apply_filters('the_content', $group_matches[0][3]) . '</div>';
                echo '<div class="contexte-group-secondary-right">' . apply_filters('the_content', $group_matches[0][4]) . '</div>';
                echo '</div>';
                echo '</div>';
            }

            // Display sixth group (index 5) - full width
            if (isset($group_matches[0][5])) {
                echo '<div class="contexte-group-tertiary-wrapper">';
                echo '<div class="contexte-group-tertiary">' . apply_filters('the_content', $group_matches[0][5]) . '</div>';
                echo '</div>';
            }

            // Display groups 7 and 8 (indices 6 and 7) side by side if both exist
            if (isset($group_matches[0][6]) && isset($group_matches[0][7])) {
                echo '<div class="contexte-group-quaternary-wrapper">';
                echo '<div class="contexte-groups-quaternary">';
                echo '<div class="contexte-group-quaternary-left">' . apply_filters('the_content', $group_matches[0][6]) . '</div>';
                echo '<div class="contexte-group-quaternary-right">' . apply_filters('the_content', $group_matches[0][7]) . '</div>';
                echo '</div>';
                echo '</div>';
            }
            // Display group 7 alone if group 8 doesn't exist
            elseif (isset($group_matches[0][6]) && !isset($group_matches[0][7])) {
                echo '<div class="contexte-group-quinary-wrapper">';
                echo '<div class="contexte-group-quinary">' . apply_filters('the_content', $group_matches[0][6]) . '</div>';
                echo '</div>';
            }

            // Display any remaining groups
            if (isset($group_matches[0][8])) {
                echo '<div class="contexte-group-quinary-wrapper">';
                echo '<div class="contexte-group-quinary">' . apply_filters('the_content', $group_matches[0][8]) . '</div>';
                echo '</div>';
            }

            echo '</div>'; // Close contexte-group-combined-wrapper
        }
        ?>
        <?php
        if (isset($group_matches[0][9]) && isset($group_matches[0][10])) {
            echo '<div class="contexte-group-bottom-wrapper-group-10">';
            echo '<div class="contexte-group-quinary-wrapper-group-10">';
            echo '<div class="contexte-group-quinary-left">' . apply_filters('the_content', $group_matches[0][9]) . '</div>';
            echo '<div class="contexte-group-quinary-right">' . apply_filters('the_content', $group_matches[0][10]) . '</div>';
            echo '</div>';
            echo '</div>';
        }
        if (isset($group_matches[0][11])) {
            echo '<div class="contexte-group-bottom-wrapper-group-11">';
            echo '<div class="contexte-group-quinary">' . apply_filters('the_content', $group_matches[0][11]) . '</div>';
            echo '</div>';
        }
        if (isset($group_matches[0][12]) && isset($group_matches[0][13])) {
            echo '<div class="contexte-group-bottom-wrapper-group-12">';
            echo '<div class="contexte-group-quinary-wrapper-group-12">';
            echo '<div class="contexte-group-quinary-left">' . apply_filters('the_content', $group_matches[0][12]) . '</div>';
            echo '<div class="contexte-group-quinary-right">' . apply_filters('the_content', $group_matches[0][13]) . '</div>';
            echo '</div>';
            echo '</div>';
        }
        ?>


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
                's' => 'LE MEMORIAL'
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
                                $morts_de_la_manche_page = get_page_by_title('Le memorial');
                                $morts_de_la_manche_url = $morts_de_la_manche_page ? get_permalink($morts_de_la_manche_page) : get_permalink();
                                ?>
                                <a href="<?php echo esc_url($morts_de_la_manche_url); ?>">
                                    <span>
                                        <?php echo (function_exists('pll_current_language') && pll_current_language() === 'en') ? 'Read more' : 'Lire la suite'; ?>
                                    </span>
                                    <img src="<?php echo get_template_directory_uri(); ?>/src/assets/arrow-right.svg" alt="" />
                                </a>
                            </div>
                        </div>
                        <div class="chapterCard-right">
                            <?php
                            $post_content = get_the_content();
                            if (preg_match('/<img[^>]+src=["\']([^"\']+)["\'][^>]*>/i', $post_content, $img_matches)) {
                                echo '<img src="' . esc_url($img_matches[1]) . '" alt="" />';
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

        <?php
endwhile;
?>

    <?php get_footer(); ?>