<?php
/**
 * Template Name: Les Disparus de la Manche
 * Template pour la page "Les Disparus de la Manche"
 *
 * Ce template sera automatiquement utilisé par WordPress
 * si le slug de la page est "les-disparus-de-la-manche"
 */
get_header();
?>

<?php
while (have_posts()):
    the_post();

    $content = get_the_content();
    $h5_title = '';

    if (preg_match('/<h5[^>]*>(.*?)<\/h5>/is', $content, $matches)) {
        $h5_title = $matches[0];
        $content = preg_replace('/<h5[^>]*>.*?<\/h5>/is', '', $content, 1);
    }
    ?>

    <div class="page-template-page-disparus">
        <h1><?php the_title(); ?></h1>
        <?php if ($h5_title): ?>
            <div class="h5-with-icon">
                <img src="<?php echo get_template_directory_uri(); ?>/src/assets/position.svg" alt="" class="position-icon" />
                <?php echo $h5_title; ?>
            </div>
        <?php endif; ?>

        <div class="disparus-container">
            <div class="container">
                <div class="disparus-content">
                    <?php echo apply_filters('the_content', $content); ?>
                </div>
                <div class="disparus-enquete">
                    <div class="disparus-enquete-title">
                        <?php echo (function_exists('pll_current_language') && pll_current_language() === 'en') ? 'Browse the investigation' : 'Parcourir l\'enquête'; ?>
                    </div>
                    <div class="disparus-enquete-cards">
                        <?php
                        $chapter_args = array(
                            'post_type' => 'post',
                            'posts_per_page' => -1,
                            'category_name' => 'chapitre',
                            'orderby' => 'date',
                            'order' => 'ASC',
                        );
                        $chapter_query = new WP_Query($chapter_args);
                        if ($chapter_query->have_posts()):
                            while ($chapter_query->have_posts()):
                                $chapter_query->the_post();
                                $chapter_id = get_the_ID();
                                $chapter_content = get_post_field('post_content', $chapter_id);
                                $subtitle = '';
                                if (preg_match('/<h3[^>]*>(.*?)<\/h3>/is', $chapter_content, $h3_matches)) {
                                    $subtitle = strip_tags($h3_matches[1]);
                                }
                                $target_url = onthemove_get_chapter_page_url($subtitle, $chapter_id);
                                ?>
                                <div class="chapterCard">
                                    <div class="chapterCard-left">
                                        <div class="chapterCard-title">
                                            <?php
                                            if (preg_match('/<h2[^>]*>(.*?)<\/h2>/is', $chapter_content, $h2_matches)) {
                                                echo strip_tags($h2_matches[1]);
                                            }
                                            ?>
                                        </div>
                                        <div class="chapterCard-subtitle">
                                            <?php
                                            if ($subtitle) {
                                                echo esc_html($subtitle);
                                            }
                                            ?>
                                        </div>
                                        <div class="chapterCard-text">
                                            <?php
                                            if (preg_match('/<p[^>]*>(.*?)<\/p>/is', $chapter_content, $p_matches)) {
                                                echo strip_tags($p_matches[1]);
                                            }
                                            ?>
                                        </div>
                                        <div class="chapterCard-cta">
                                            <a href="<?php echo esc_url($target_url); ?>">
                                                <span><?php echo (function_exists('pll_current_language') && pll_current_language() === 'en') ? 'Read more' : 'Lire la suite'; ?></span>
                                                <img src="<?php echo get_template_directory_uri(); ?>/src/assets/arrow-right.svg"
                                                    alt="" />
                                            </a>
                                        </div>
                                    </div>
                                    <div class="chapterCard-right">
                                        <?php
                                        if (preg_match('/<img[^>]+src=["\']([^"\']+)["\'][^>]*>/i', $chapter_content, $img_matches)) {
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
                </div>
            </div>
        </div>

        <?php
endwhile;
?>

<?php get_footer(); ?>
