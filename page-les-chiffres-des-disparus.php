<?php
/**
 * Template Name: Les chiffres des disparus
 * Template pour la page "Les chiffres des disparus"
 *
 * Ce template sera automatiquement utilisé par WordPress
 * si le slug de la page est "les-chiffres-des-disparus"
 */
get_header();
?>

<?php
while (have_posts()):
    the_post();
    ?>

    <div class="page-template-page-chiffres-disparus">
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
                <a class="carousel-arrow-icon" href="<?php echo esc_url(home_url('/la-frontiere-franco-britannique/')); ?>">
                    <img src="<?php echo get_template_directory_uri(); ?>/src/assets/arrow-left.svg" alt="" />
                </a>
                <a class="carousel-arrow-icon" href="<?php echo esc_url(home_url('/le-contexte-des-disparitions/')); ?>">
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
            <div class="chiffres-disparus-container-content-middle">
                <?php
                if (preg_match_all('/<p[^>]*>(.*?)<\/p>/is', $post_content, $p_matches)) {
                    if (isset($p_matches[1][2])) {
                        echo '<p class="chiffres-disparus-container-content-middle-paragraph-3">' . wp_kses_post($p_matches[1][2]) . '</p>';
                    }
                    if (isset($p_matches[1][3])) {
                        echo '<p class="chiffres-disparus-container-content-middle-paragraph-4">' . wp_kses_post($p_matches[1][3]) . '</p>';
                    }
                    if (isset($p_matches[1][4])) {
                        echo '<p class="chiffres-disparus-container-content-middle-paragraph-5">' . wp_kses_post($p_matches[1][4]) . '</p>';
                    }
                    if (isset($p_matches[1][5])) {
                        echo '<p class="chiffres-disparus-container-content-middle-paragraph-6">' . wp_kses_post($p_matches[1][5]) . '</p>';
                    }
                    if (isset($p_matches[1][6])) {
                        echo '<p class="chiffres-disparus-container-content-middle-paragraph-7">' . wp_kses_post($p_matches[1][6]) . '</p>';
                    }
                    if (isset($p_matches[1][7])) {
                        echo '<p class="chiffres-disparus-container-content-middle-paragraph-8">' . wp_kses_post($p_matches[1][7]) . '</p>';
                    }
                    if (isset($p_matches[1][8])) {
                        echo '<p class="chiffres-disparus-container-content-middle-paragraph-9">' . wp_kses_post($p_matches[1][8]) . '</p>';
                    }
                }
                ?>

            </div>
            <div class="chiffres-disparus-container-content-bottom">
                <?php
                if (preg_match_all('/<h5[^>]*>(.*?)<\/h5>/is', $post_content, $h5_matches)) {
                    if (isset($h5_matches[1][0])) {
                        echo '<h5>' . wp_kses_post($h5_matches[1][0]) . '</h5>';
                    }
                }
                if (preg_match_all('/<p[^>]*>(.*?)<\/p>/is', $post_content, $p_matches)) {
                    if (isset($p_matches[1][9])) {
                        echo '<p>' . wp_kses_post($p_matches[1][9]) . '</p>';
                    }
                }
                ?>
            </div>
        </div>
        <div class="chiffres-disparus-container-content-people-missing">
            <?php
            $args = array(
                'category_name' => 'disparus',
                'posts_per_page' => -1,
                'post_status' => 'publish',
                'orderby' => 'date',
                'order' => 'asc'
            );

            $disparus_query = new WP_Query($args);

            if ($disparus_query->have_posts()):
                $disparus_index = 0;
                while ($disparus_query->have_posts()):
                    $disparus_query->the_post();
                    $is_hidden = $disparus_index >= 8;
                    ?>
                    <div class="disparus-article<?php echo $is_hidden ? ' is-hidden' : ''; ?>">
                        <?php
                        $disparus_content = get_the_content();
                        if (preg_match('/<img[^>]*class=["\']([^"\']+)["\'][^>]*src=["\']([^"\']+)["\'][^>]*>/i', $disparus_content, $img_matches)) {
                            $img_class = $img_matches[1];
                            $img_src = $img_matches[2];
                            if (preg_match('/wp-image-(\d+)/', $img_class, $id_matches)) {
                                $attachment_id = (int) $id_matches[1];
                                echo '<div class="disparus-image">' . wp_get_attachment_image($attachment_id, 'full') . '</div>';
                            } else {
                                echo '<div class="disparus-image"><img src="' . esc_url($img_src) . '" alt="" /></div>';
                            }
                        } elseif (preg_match('/<img[^>]+src=["\']([^"\']+)["\'][^>]*>/i', $disparus_content, $img_matches)) {
                            echo '<div class="disparus-image"><img src="' . esc_url($img_matches[1]) . '" alt="" /></div>';
                        }

                        echo '<h3 class="disparus-title">' . wp_kses_post(get_the_title()) . '</h3>';

                        if (preg_match_all('/<p[^>]*>(.*?)<\/p>/is', $disparus_content, $p_matches)) {
                            if (isset($p_matches[1][0])) {
                                echo '<p>' . wp_kses_post($p_matches[1][0]) . '</p>';
                            }
                            if (isset($p_matches[1][1])) {
                                echo '<p>' . wp_kses_post($p_matches[1][1]) . '</p>';
                            }

                        }

                        $is_en = (function_exists('pll_current_language') && pll_current_language() === 'en')
                            || (strpos(home_url('/'), '/en/') !== false);
                        ?>
                        <a href="<?php the_permalink(); ?>" class="disparus-link">
                            <?php echo $is_en ? 'Read the biography in English' : 'Lire la biographie'; ?>
                        </a>
                        <?php
                        ?>
                    </div>
                    <?php
                    $disparus_index++;
                endwhile;
                wp_reset_postdata();
            else:
                ?>
                <p>Aucun article trouvé dans la catégorie "disparus".</p>
                <?php
            endif;
            ?>
            <div class="disparus-view-all">
                <?php
                $disparus_category = get_category_by_slug('disparus');
                $disparus_url = $disparus_category
                    ? get_category_link($disparus_category)
                    : home_url('/category/disparus/');
                ?>
                <button class="disparus-view-all-button" type="button" data-disparus-show-all>
                    Voir tout les biographies
                </button>
            </div>
        </div>
        <div class="disparus-enquete-cards">
            <?php
            $chapter_args = array(
                'post_type' => 'post',
                'posts_per_page' => 1,
                'category_name' => 'chapitre',
                'orderby' => 'date',
                'order' => 'ASC',
                's' => 'Le contexte des disparitions'
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
                                $contexte_page = get_page_by_title('Le contexte des disparitions');
                                $contexte_url = $contexte_page ? get_permalink($contexte_page) : get_permalink();
                                ?>
                                <a href="<?php echo esc_url($contexte_url); ?>">
                                    <span><?php echo (function_exists('pll_current_language') && pll_current_language() === 'en') ? 'Read more' : 'Lire la suite'; ?></span>
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