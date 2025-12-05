<?php
/**
 * Template Name: La Carte
 * Template pour la page "LA CARTE"
 * 
 * Ce template sera automatiquement utilisé par WordPress
 * si le slug de la page est "la-carte"
 */
get_header();
?>

<?php
// Récupérer les données de la page
while (have_posts()):
    the_post();
    ?>

    <div class="la-carte-container">
        <div class="la-carte-content">
            <h1><?php the_title(); ?></h1>
            <div class="la-carte-body">
                <?php the_content(); ?>
            </div>
        </div>
    </div>

    <?php
endwhile;
?>

<?php
get_footer();
?>