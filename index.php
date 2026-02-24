<?php
/**
 * Template pour la page d'accueil avec carousel Swiper
 */
get_header();
?>

<div id="primary" class="content-area">

    <main id="main" class="site-main">
        <?php
        // Inclure le template single.php
        get_template_part('templates/single');
        ?>
    </main>

</div>

<?php
get_footer();

?>
