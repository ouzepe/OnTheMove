<?php
/**
 * Template pour la page 404
 */
get_header();
?>

<div class="container">
    <section class="error-404 not-found">
        <header class="page-header">
            <h1 class="page-title"><?php esc_html_e('Oops! Page non trouvée', 'onthemove'); ?></h1>
        </header>

        <div class="page-content">
            <p><?php esc_html_e('Il semble que rien n\'ait été trouvé à cet emplacement. Essayez peut-être une recherche?', 'onthemove'); ?></p>

            <?php get_search_form(); ?>

            <div class="widget">
                <h2 class="widget-title"><?php esc_html_e('Pages les plus récentes', 'onthemove'); ?></h2>
                <ul>
                    <?php
                    wp_list_pages(array(
                        'title_li' => '',
                        'number'   => 5,
                    ));
                    ?>
                </ul>
            </div>

            <div class="widget">
                <h2 class="widget-title"><?php esc_html_e('Catégories', 'onthemove'); ?></h2>
                <ul>
                    <?php
                    wp_list_categories(array(
                        'orderby'    => 'count',
                        'order'      => 'DESC',
                        'show_count' => 1,
                        'title_li'   => '',
                        'number'     => 10,
                    ));
                    ?>
                </ul>
            </div>
        </div>
    </section>
</div>

<?php
get_footer();

