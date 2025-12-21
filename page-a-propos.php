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
                    <?php
                    $team_args = array(
                        'category_name' => 'team',
                        'posts_per_page' => -1,
                        'orderby' => 'date',
                        'order' => 'ASC'
                    );

                    $team_query = new WP_Query($team_args);

                    if ($team_query->have_posts()):
                        ?>
                        <div class="team-members">
                            <?php
                            while ($team_query->have_posts()):
                                $team_query->the_post();
                                ?>
                                <div class="team-members-info">
                                    <?php if (has_post_thumbnail()): ?>
                                        <?php the_post_thumbnail('medium'); ?>
                                    <?php endif; ?>

                                    <?php the_content(); ?>
                                </div>
                                <?php
                            endwhile;
                            ?>
                        </div>
                        <?php

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