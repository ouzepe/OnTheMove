<?php
/**
 * Template Name: Le contexte des disparitions
 * Template pour la page "Le contexte des disparitions"
 *
 * Ce template sera automatiquement utilisé par WordPress
 * si le slug de la page est "le-contexte-des-disparitions"
 */
get_header();
?>

<?php
while (have_posts()):
    the_post();
    ?>

    <div class="page-template-page-contexte-des-disparitions">
        <h1><?php the_title(); ?></h1>

        <div class="contexte-des-disparitions-container">
            <div class="container">
                <div class="contexte-des-disparitions-content">
                    <?php the_content(); ?>
                </div>
            </div>
        </div>
    </div>

    <?php
endwhile;
?>

<?php get_footer(); ?>