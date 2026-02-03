<?php
/**
 * Template Name: Au depart de la Syrie
 * Template pour la page "Au depart de la Syrie"
 *
 * Ce template sera automatiquement utilise par WordPress
 * si le slug de la page est "au-depart-de-la-syrie"
 */
get_header();
?>

<?php
while (have_posts()):
    the_post();
    ?>

    <div class="page-template-page-au-depart-de-la-syrie">
        <div class="au-depart-de-la-syrie-container">
            <div class="container">
                <div class="au-depart-de-la-syrie-content">
                    <?php
                    $post_content = get_the_content();
                    // Extract the image block
                    if (preg_match('/<figure[^>]*class="[^"]*wp-block-image[^"]*"[^>]*>.*?<\/figure>/is', $post_content, $img_matches)) {
                        echo $img_matches[0];
                    }
                    ?>
                </div>
            </div>
        </div>
    </div>

    <?php
endwhile;
?>

<?php get_footer(); ?>