<?php
/**
 * Template pour la page d'accueil avec carousel Swiper
 */
get_header();
?>

<div class="home-carousel-container">
    <div class="swiper home-swiper">
        <div class="swiper-wrapper">
            <div class="swiper-slide">
                <img src="<?php echo get_template_directory_uri(); ?>/src/assets/slide1.jpg" alt="Slide 1">
            </div>
            <div class="swiper-slide">
                <img src="<?php echo get_template_directory_uri(); ?>/src/assets/slide2.jpg" alt="Slide 2">
            </div>
            <div class="swiper-slide">
                <img src="<?php echo get_template_directory_uri(); ?>/src/assets/slide3.jpg" alt="Slide 3">
            </div>
            <div class="swiper-slide">
                <img src="<?php echo get_template_directory_uri(); ?>/src/assets/slide4.jpg" alt="Slide 4">
            </div>
        </div>
        <div class="swiper-pagination"></div>
    </div>
</div>

<style>
    .home-carousel-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 999;
    }

    .home-swiper {
        width: 100%;
        height: 100%;
    }

    .home-swiper .swiper-slide {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .home-swiper .swiper-slide img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .home-swiper .swiper-pagination {
        bottom: 20px !important;
        right: 20px !important;
        left: auto !important;
        width: auto !important;
        text-align: right;
    }

    .home-swiper .swiper-pagination-bullet {
        width: 12px;
        height: 12px;
        background: rgba(255, 255, 255, 0.5);
        opacity: 1;
        margin: 0 5px !important;
    }

    .home-swiper .swiper-pagination-bullet-active {
        background: #fff;
    }
</style>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        const swiper = new Swiper('.home-swiper', {
            direction: 'horizontal',
            loop: false,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            allowTouchMove: false,
            keyboard: false,
            mousewheel: false,
        });
    });
</script>

<?php
get_footer();
