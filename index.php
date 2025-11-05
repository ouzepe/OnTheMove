<?php
/**
 * Template par défaut pour la page d'accueil et les archives par défaut
 */
get_header();
?>

<div class="container">
    <?php if (have_posts()) : ?>
        <div class="posts-list">
            <?php
            while (have_posts()) :
                the_post();
                ?>
                <article id="post-<?php the_ID(); ?>" <?php post_class('post-item'); ?>>
                    <header class="entry-header">
                        <h2 class="entry-title">
                            <a href="<?php the_permalink(); ?>" rel="bookmark">
                                <?php the_title(); ?>
                            </a>
                        </h2>
                        <div class="entry-meta">
                            <span class="posted-on">
                                <?php echo get_the_date(); ?>
                            </span>
                            <span class="byline">
                                <?php esc_html_e('par', 'onthemove'); ?> <?php the_author(); ?>
                            </span>
                        </div>
                    </header>

                    <?php if (has_post_thumbnail()) : ?>
                        <div class="post-thumbnail">
                            <a href="<?php the_permalink(); ?>">
                                <?php the_post_thumbnail('medium'); ?>
                            </a>
                        </div>
                    <?php endif; ?>

                    <div class="entry-summary">
                        <?php the_excerpt(); ?>
                    </div>

                    <footer class="entry-footer">
                        <a href="<?php the_permalink(); ?>" class="read-more">
                            <?php esc_html_e('Lire la suite', 'onthemove'); ?> →
                        </a>
                    </footer>
                </article>
                <?php
            endwhile;
            ?>
        </div>

        <?php
        // Pagination
        the_posts_pagination(array(
            'mid_size'  => 2,
            'prev_text' => esc_html__('← Précédent', 'onthemove'),
            'next_text' => esc_html__('Suivant →', 'onthemove'),
        ));
        ?>

    <?php else : ?>
        <div class="no-posts">
            <p><?php esc_html_e('Aucun contenu trouvé.', 'onthemove'); ?></p>
        </div>
    <?php endif; ?>
</div>

<?php
get_footer();
?>
