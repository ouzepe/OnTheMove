<?php
/**
 * Template Name: Les chiffres des disparus
 * Template pour la page "Les chiffres des disparus"
 *
 * Ce template sera automatiquement utilisé par WordPress
 * si le slug de la page est "les-chiffres-des-disparus"
 */
get_header();
?>

<?php
while (have_posts()):
    the_post();
    ?>

    <div class="page-template-page-chiffres-disparus">
        <div class="chiffres-disparus-container-image">
            <?php
            $post_content = get_the_content();
            if (preg_match('/<img[^>]*class=["\']([^"\']+)["\'][^>]*src=["\']([^"\']+)["\'][^>]*>/i', $post_content, $img_matches)) {
                $img_class = $img_matches[1];
                $img_src = $img_matches[2];
                if (preg_match('/wp-image-(\d+)/', $img_class, $id_matches)) {
                    $attachment_id = (int) $id_matches[1];
                    echo wp_get_attachment_image($attachment_id, 'full');
                } else {
                    echo '<img src="' . esc_url($img_src) . '" alt="" />';
                }
            } elseif (preg_match('/<img[^>]+src=["\']([^"\']+)["\'][^>]*>/i', $post_content, $img_matches)) {
                echo '<img src="' . esc_url($img_matches[1]) . '" alt="" />';
            }
            ?>
        </div>
        <div class="chiffres-disparus-container-carousel">
            <div class="chiffres-disparus-container-carousel-title">
            <?php
            $post_content = get_the_content();
            if (preg_match('/<h2[^>]*>(.*?)<\/h2>/is', $post_content, $h2_matches)) {
                echo '<h2>' . wp_kses_post($h2_matches[1]) . '</h2>';
            }
            ?>
            </div>
        </div>
    </div>

    <?php
endwhile;
?>

<?php get_footer(); ?>