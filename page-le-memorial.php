<?php
/**
 * Template Name: Les morts de la manche
 * Template pour la page "Les morts de la manche"
 *
 * Ce template sera automatiquement utilisé par WordPress
 * si le slug de la page est "le-memorial"
 */
get_header();
?>

<?php
while (have_posts()):
    the_post();
    ?>

    <div class="page-template-page-morts-de-la-manche">
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
                <a class="carousel-arrow-icon"
                    href="<?php echo esc_url(home_url('/les-proches/')); ?>">
                    <img src="<?php echo get_template_directory_uri(); ?>/src/assets/arrow-left.svg" alt="" />
                </a>
                <a class="carousel-arrow-icon is-disabled" href="#" aria-disabled="true" tabindex="-1">
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
            <div class="morts-de-la-manche-container-content-middle">
                <?php
                if (preg_match_all('/<p[^>]*>(.*?)<\/p>/is', $post_content, $p_matches)) {
                    if (isset($p_matches[1][2])) {
                        echo '<p>' . wp_kses_post($p_matches[1][2]) . '</p>';
                    }
                    if (isset($p_matches[1][3])) {
                        echo '<p>' . wp_kses_post($p_matches[1][3]) . '</p>';
                    }
                    if (isset($p_matches[1][4])) {
                        echo '<p>' . wp_kses_post($p_matches[1][4]) . '</p>';
                    }
                }
                ?>
            </div>
            <div class="list-des-morts-de-la-manche">
                <figure contenteditable="false" data-original-src="https://apps.lesjours.fr/morts-calais/"
                    data-protected-src="https://apps.lesjours.fr/morts-calais/">
                    <iframe src="https://apps.lesjours.fr/morts-calais/" frameborder="0" allowfullscreen></iframe>
                </figure>
            </div>
        </div>
        <!-- <div class="les-morts-de-la-manche-title">
            <div class="les-morts-de-la-manche-title">
                <?php
                $is_en = (function_exists('pll_current_language') && pll_current_language() === 'en')
                    || (strpos(home_url('/'), '/en/') !== false);
                echo $is_en ? 'Biographies of the Channel deaths' : 'Biographies des morts de la manche';
                ?>
            </div>
        </div> -->
        <!-- <div class="chiffres-disparus-container-content-people-missing">

            <?php
            $args = array(
                'category_name' => 'mort-de-la-manche',
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
                        <button type="button" class="disparus-link">
                            <?php echo $is_en ? 'Read the biography' : 'Lire la biographie'; ?>
                        </button>
                        <?php
                        $drawer_content = apply_filters('the_content', get_the_content());
                        $drawer_content = preg_replace('/<img[^>]*>/i', '', $drawer_content, 1);
                        ?>
                        <div class="disparus-drawer-data" data-drawer-title="<?php echo esc_attr(get_the_title()); ?>" hidden>
                            <?php
                            $drawer_image_html = '';
                            if (preg_match('/<img[^>]*class=["\']([^"\']+)["\'][^>]*src=["\']([^"\']+)["\'][^>]*>/i', $disparus_content, $img_matches)) {
                                $img_class = $img_matches[1];
                                $img_src = $img_matches[2];
                                if (preg_match('/wp-image-(\d+)/', $img_class, $id_matches)) {
                                    $attachment_id = (int) $id_matches[1];
                                    $drawer_image_html = wp_get_attachment_image($attachment_id, 'full');
                                } else {
                                    $drawer_image_html = '<img src="' . esc_url($img_src) . '" alt="" />';
                                }
                            } elseif (preg_match('/<img[^>]+src=["\']([^"\']+)["\'][^>]*>/i', $disparus_content, $img_matches)) {
                                $drawer_image_html = '<img src="' . esc_url($img_matches[1]) . '" alt="" />';
                            }
                            ?>
                            <div class="disparus-drawer-image">
                                <?php echo $drawer_image_html; ?>
                            </div>
                            <div class="disparus-drawer-body">
                                <?php echo wp_kses_post($drawer_content); ?>
                            </div>
                        </div>
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
            <div id="disparus-drawer" class="disparus-drawer" aria-hidden="true">
                <button type="button" class="disparus-drawer-close" aria-label="Fermer">×</button>
                <div id="disparus-drawer-content"></div>
            </div>
        </div> -->
        <?php
endwhile;
?>

    <?php get_footer(); ?>