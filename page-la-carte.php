<?php
/**
 * Template Name: La Carte
 * Template pour la page "LA CARTE"
 *
 * Ce template sera automatiquement utilisé par WordPress
 * si le slug de la page est "la-carte"
 */
get_header();
?>

<?php
// Récupérer les données de la page
while (have_posts()):
    the_post();
    ?>

    <div class="la-carte-container">
        <div id="im-map"></div>
        <div id="im-drawer" aria-hidden="true">
            <button type="button" class="im-drawer-close" aria-label="Fermer">×</button>
            <div id="drawer-content"></div>
        </div>
        <p class="card-txt-slt">Sélectionnez un territoire d'enquête sur la carte.</p>
        <p class="card-txt-src">Source : Natural Earth. Réalisé avec Graticule</p>
    </div>

    <?php
endwhile;
?>