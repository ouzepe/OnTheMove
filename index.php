<?php
/**
 * Template pour la page d'accueil avec carousel Swiper
 */
// get_header();
?>

<div class="home-carousel-container">
    <div class="swiper home-swiper">
        <div class="swiper-wrapper">
            <?php
            // Afficher les 4 images du carousel depuis src/assets/carousel
            for ($i = 1; $i <= 4; $i++) {
                $image_url = get_template_directory_uri() . '/src/assets/carousel/carousel-img-' . $i . '.jpg';
                ?>
                <div class="swiper-slide">
                    <img src="<?php echo esc_url($image_url); ?>" alt="Slide <?php echo $i; ?>">
                </div>
                <?php
            }
            ?>
        </div>
        <div class="swiper-pagination"></div>
    </div>
</div>



<?php
// get_footer();
?>