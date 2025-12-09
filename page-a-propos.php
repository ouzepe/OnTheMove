<?php
/**
 * Template Name: À propos
 * Template pour la page "À propos"
 * 
 * Ce template sera automatiquement utilisé par WordPress
 * si le slug de la page est "a-propos"
 */
get_header();
?>

<?php
// Récupérer les données de la page
while (have_posts()):
    the_post();
    ?>

    <div class="page-template-page-a-propos">
        <h1><?php echo str_replace('À', 'A', get_the_title()); ?></h1>

        <div class="a-propos-container">
            <div class="container">
                <div class="a-propos-content">
                    <?php the_content(); ?>
                </div>
            </div>
        </div>
    </div>

    <?php
endwhile;
?>

<?php get_footer(); ?>