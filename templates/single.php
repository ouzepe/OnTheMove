<?php
/**
 * Template pour les articles individuels
 */
get_header();
?>

<div class="container">
    <?php
    while (have_posts()) :
        the_post();
        ?>
        <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
            <header class="entry-header">
                <h1 class="entry-title"><?php the_title(); ?></h1>
                <div class="entry-meta">
                    <span class="posted-on">
                        <?php
                        printf(
                            esc_html_x('Publié le %s', 'date de publication', 'onthemove'),
                            '<a href="' . esc_url(get_permalink()) . '" rel="bookmark">' . get_the_date() . '</a>'
                        );
                        ?>
                    </span>
                    <span class="byline">
                        <?php
                        printf(
                            esc_html_x('par %s', 'auteur', 'onthemove'),
                            '<span class="author vcard"><a class="url fn n" href="' . esc_url(get_author_posts_url(get_the_author_meta('ID'))) . '">' . esc_html(get_the_author()) . '</a></span>'
                        );
                        ?>
                    </span>
                    <?php if (has_category()) : ?>
                        <span class="cat-links">
                            <?php esc_html_e('Catégories:', 'onthemove'); ?> <?php the_category(', '); ?>
                        </span>
                    <?php endif; ?>
                </div>
            </header>

            <?php if (has_post_thumbnail()) : ?>
                <div class="post-thumbnail">
                    <?php the_post_thumbnail('large'); ?>
                </div>
            <?php endif; ?>

            <div class="entry-content">
                <?php
                the_content();

                wp_link_pages(array(
                    'before' => '<div class="page-links">' . esc_html__('Pages:', 'onthemove'),
                    'after'  => '</div>',
                ));
                ?>
            </div>

            <footer class="entry-footer">
                <?php
                if (has_tag()) {
                    echo '<div class="tags-links">';
                    echo esc_html__('Tags:', 'onthemove') . ' ';
                    the_tags('', ', ', '');
                    echo '</div>';
                }
                ?>
            </footer>

            <?php
            // Navigation entre articles
            the_post_navigation(array(
                'prev_text' => '<span class="nav-subtitle">' . esc_html__('Précédent:', 'onthemove') . '</span> <span class="nav-title">%title</span>',
                'next_text' => '<span class="nav-subtitle">' . esc_html__('Suivant:', 'onthemove') . '</span> <span class="nav-title">%title</span>',
            ));
            ?>

            <?php if (comments_open() || get_comments_number()) : ?>
                <div class="comments-section">
                    <?php comments_template(); ?>
                </div>
            <?php endif; ?>
        </article>
        <?php
    endwhile;
    ?>
</div>

<?php
get_footer();

