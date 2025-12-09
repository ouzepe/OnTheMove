<?php
/**
 * Template Name: Contact
 * Template pour la page "Contact"
 */
get_header();
?>

<?php
// Récupérer les données de la page
while (have_posts()):
    the_post();
    ?>

    <div class="page-template-page-contact">
        <h1><?php the_title(); ?></h1>

        <div class="contact-container">
            <div class="container">

                <div class="contact-content">
                    <?php the_content(); ?>
                </div>
            </div>
        </div>
    </div>

    <?php
endwhile;
?>

<?php get_footer(); ?>