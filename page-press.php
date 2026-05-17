<?php
/**
 * Template Name: Press
 * Template pour la page "Press"
 * 
 * Ce template sera automatiquement utilisé par WordPress
 * si le slug de la page est "press"
 */
get_header();
?>

<?php
while (have_posts()):
    the_post();
    ?>

    <div class="page-template-page-press">
        <?php
        $content = get_the_content();

        preg_match('/<h2[^>]*>(.*?)<\/h2>/i', $content, $matches);
        $first_h2 = isset($matches[0]) ? $matches[0] : '';
        $content_without_first_h2 = preg_replace('/<h2[^>]*>.*?<\/h2>/i', '', $content, 1);
        ?>

        <?php if ($first_h2): ?>
            <h2 class="press-title"><?php echo strip_tags($first_h2); ?></h2>
        <?php endif; ?>

        <div class="press-container">
            <div class="container">
                <div class="press-content">
                    <?php echo apply_filters('the_content', $content_without_first_h2); ?>

                    <h2 class="press-featured-title">
                        <?php echo (function_exists('pll_current_language') && pll_current_language() === 'en') ? 'FEATURED' : 'A LA UNE'; ?>
                    </h2>

                    <div class="press-items">
                        <?php
                        $args = array(
                            'post_type' => 'post',
                            'posts_per_page' => -1,
                            'category_name' => 'a-la-une',
                            'orderby' => 'date',
                            'order' => 'DESC'
                        );

                        $featured_posts = new WP_Query($args);

                        if ($featured_posts->have_posts()):
                            while ($featured_posts->have_posts()):
                                $featured_posts->the_post();
                                $press_content = apply_filters('the_content', get_the_content());
                                $press_link_url = get_permalink();
                                if (preg_match_all('/<a[^>]+href=["\']([^"\']+)["\'][^>]*>.*?<\/a>/is', $press_content, $link_matches, PREG_SET_ORDER)) {
                                    $last_link = end($link_matches);
                                    if (!empty($last_link[1])) {
                                        $press_link_url = $last_link[1];
                                    }
                                    if (!empty($last_link[0])) {
                                        $press_content = str_replace($last_link[0], '', $press_content);
                                    }
                                }
                                ?>
                                <div class="press-item" data-press-link="<?php echo esc_url($press_link_url); ?>">
                                    <?php if (has_post_thumbnail()): ?>
                                        <div class="press-item-image">
                                            <a target="_blank" href="<?php echo esc_url($press_link_url); ?>">
                                                <?php the_post_thumbnail('large'); ?>
                                            </a>
                                        </div>
                                    <?php endif; ?>

                                    <div class="press-item-content">
                                        <?php echo $press_content; ?>
                                    </div>
                                </div>
                                <?php
                            endwhile;
                            wp_reset_postdata();
                        else:
                            ?>
                            <p><?php echo (function_exists('pll_current_language') && pll_current_language() === 'en') ? 'No featured articles yet.' : 'Aucun article à la une pour le moment.'; ?>
                            </p>
                            <?php
                        endif;
                        ?>
                    </div>
                    <script>
                        document.querySelectorAll(".press-item").forEach(function (item) {
                            item.addEventListener("click", function (event) {
                                if (event.target.closest("a")) {
                                    return;
                                }
                                var link = item.getAttribute("data-press-link");
                                if (link) {
                                    window.open(link, "_blank", "noopener,noreferrer");
                                }
                            });
                        });
                    </script>

                    <h2 class="press-all-articles-title">
                        <?php echo (function_exists('pll_current_language') && pll_current_language() === 'en') ? 'All our articles' : 'Tous nos articles'; ?>
                    </h2>

                    <div class="press-all-articles">
                        <?php
                        $paged = get_query_var('paged') ? get_query_var('paged') : (get_query_var('page') ? get_query_var('page') : 1);
                        $args = array(
                            'post_type' => 'post',
                            'posts_per_page' => 12,
                            'category_name' => 'press',
                            'orderby' => 'date',
                            'order' => 'DESC',
                            'paged' => $paged
                        );

                        $all_posts = new WP_Query($args);

                        if ($all_posts->have_posts()):
                            while ($all_posts->have_posts()):
                                $all_posts->the_post();
                                $press_content = apply_filters('the_content', get_the_content());
                                $press_link_url = get_permalink();
                                if (preg_match_all('/<a[^>]+href=["\']([^"\']+)["\'][^>]*>.*?<\/a>/is', $press_content, $link_matches, PREG_SET_ORDER)) {
                                    $last_link = end($link_matches);
                                    if (!empty($last_link[1])) {
                                        $press_link_url = $last_link[1];
                                    }
                                    if (!empty($last_link[0])) {
                                        $press_content = str_replace($last_link[0], '', $press_content);
                                    }
                                }
                                ?>
                                <div class="press-mini-item" data-press-link="<?php echo esc_url($press_link_url); ?>">
                                    <?php if (has_post_thumbnail()): ?>
                                        <div class="press-mini-item-image">
                                            <a target="_blank" href="<?php echo esc_url($press_link_url); ?>">
                                                <?php the_post_thumbnail('large'); ?>
                                            </a>
                                        </div>
                                    <?php endif; ?>

                                    <div class="press-mini-item-content">
                                        <?php echo $press_content; ?>
                                    </div>
                                </div>
                                <?php
                            endwhile;
                            wp_reset_postdata();
                        else:
                            ?>
                            <p><?php echo (function_exists('pll_current_language') && pll_current_language() === 'en') ? 'No articles yet.' : 'Aucun article pour le moment.'; ?>
                            </p>
                            <?php
                        endif;
                        ?>
                    </div>

                    <?php
                    if ($all_posts->max_num_pages > 1):
                        $current_page = max(1, $paged);
                        $total_pages = $all_posts->max_num_pages;
                        $base_url = get_permalink();
                        if (strpos($base_url, '?') !== false) {
                            $base_url = strtok($base_url, '?');
                        }
                        ?>
                        <div class="press-pagination">
                            <?php
                            if ($current_page > 1):
                                $prev_url = $current_page == 2 ? $base_url : add_query_arg('paged', $current_page - 1, $base_url);
                                ?>
                                <a href="<?php echo esc_url($prev_url); ?>" class="press-pagination-arrow press-pagination-prev">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </a>
                            <?php else: ?>
                                <span class="press-pagination-arrow press-pagination-prev disabled">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </span>
                            <?php endif; ?>

                            <div class="press-pagination-numbers">
                                <?php
                                if ($current_page <= 4) {
                                    $start = 1;
                                    $end = min($total_pages, 7);
                                } elseif ($current_page >= $total_pages - 3) {
                                    $start = max(1, $total_pages - 6);
                                    $end = $total_pages;
                                } else {
                                    $start = $current_page - 3;
                                    $end = $current_page + 3;
                                }

                                if ($start > 1):
                                    ?>
                                    <a href="<?php echo esc_url($base_url); ?>" class="press-pagination-number">1</a>
                                    <?php
                                    if ($start > 2):
                                        ?>
                                        <span class="press-pagination-dots">...</span>
                                        <?php
                                    endif;
                                endif;

                                for ($i = $start; $i <= $end; $i++):
                                    if ($i == $current_page):
                                        ?>
                                        <span class="press-pagination-number active"><?php echo $i; ?></span>
                                        <?php
                                    else:
                                        $page_url = $i == 1 ? $base_url : add_query_arg('paged', $i, $base_url);
                                        ?>
                                        <a href="<?php echo esc_url($page_url); ?>"
                                            class="press-pagination-number"><?php echo $i; ?></a>
                                        <?php
                                    endif;
                                endfor;

                                if ($end < $total_pages):
                                    if ($end < $total_pages - 1):
                                        ?>
                                        <span class="press-pagination-dots">...</span>
                                        <?php
                                    endif;
                                    $last_url = add_query_arg('paged', $total_pages, $base_url);
                                    ?>
                                    <a href="<?php echo esc_url($last_url); ?>"
                                        class="press-pagination-number"><?php echo $total_pages; ?></a>
                                    <?php
                                endif;
                                ?>
                            </div>

                            <?php
                            if ($current_page < $total_pages):
                                $next_url = add_query_arg('paged', $current_page + 1, $base_url);
                                ?>
                                <a href="<?php echo esc_url($next_url); ?>" class="press-pagination-arrow press-pagination-next">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </a>
                            <?php else: ?>
                                <span class="press-pagination-arrow press-pagination-next disabled">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </span>
                            <?php endif; ?>
                        </div>
                        <?php
                    endif;
                    ?>
                    <script>
                        document.querySelectorAll(".press-mini-item").forEach(function (item) {
                            item.addEventListener("click", function (event) {
                                if (event.target.closest("a")) {
                                    return;
                                }
                                var link = item.getAttribute("data-press-link");
                                if (link) {
                                    window.open(link, "_blank", "noopener,noreferrer");
                                }
                            });
                        });
                    </script>
                </div>
            </div>
        </div>
    </div>


    <?php
endwhile;
?>

<?php get_footer(); ?>