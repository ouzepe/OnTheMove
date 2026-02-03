<?php
/**
 * Template Name: Aux frontieres de la Bulgarie
 * Template pour la page "Aux frontieres de la Bulgarie"
 *
 * Ce template sera automatiquement utilise par WordPress
 * si le slug de la page est "aux-frontieres-de-la-bulgarie"
 */
get_header();
?>

<?php
while (have_posts()):
    the_post();
    ?>

    <div class="page-template-page-aux-frontieres-de-la-bulgarie">
        <div class="aux-frontieres-de-la-bulgarie-container">
            <div class="container">
                <div class="aux-frontieres-de-la-bulgarie-content">
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