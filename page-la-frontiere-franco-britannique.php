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
        <h1><?php the_title(); ?></h1>

        <div class="frontiere-franco-britannique-container">
            <div class="container">
                <div class="frontiere-franco-britannique-content">
                    <?php the_content(); ?>
                </div>
            </div>
        </div>
    </div>

    <?php
endwhile;
?>

<?php get_footer(); ?>