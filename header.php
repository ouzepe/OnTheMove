<!DOCTYPE html>
<html <?php language_attributes(); ?>>

<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <!-- <meta name="viewport" content="width=device-width, initial-scale=1.0"> -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <?php
    // Précharger les polices pour éviter le changement de taille au chargement
    $template_dir = get_template_directory_uri();
    ?>
    <link rel="preload"
        href="<?php echo $template_dir; ?>/src/fonts/manuka-font-family/TestManuka-Regular-BF663c33db89825.otf"
        as="font" type="font/otf" crossorigin>
    <link rel="preload"
        href="<?php echo $template_dir; ?>/src/fonts/manuka-font-family/TestManuka-Bold-BF663c33db7b03f.otf" as="font"
        type="font/otf" crossorigin>
    <link rel="preload" href="<?php echo $template_dir; ?>/src/fonts/Newsreader/Newsreader-VariableFont_opsz,wght.ttf"
        as="font" type="font/ttf" crossorigin>
    <link rel="preload"
        href="<?php echo $template_dir; ?>/src/fonts/Newsreader/Newsreader-Italic-VariableFont_opsz,wght.ttf" as="font"
        type="font/ttf" crossorigin>
    <link rel="preload"
        href="<?php echo $template_dir; ?>/src/fonts/Commissioner/Commissioner/Commissioner-VariableFont_FLAR,VOLM,slnt,wght.ttf"
        as="font" type="font/ttf" crossorigin>
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?> data-template-dir="<?php echo esc_url(get_template_directory_uri()); ?>">
    <?php wp_body_open(); ?>

    <div id="page" class="site">
        <header id="header" class="header">
            <div class="container">
                <nav id="header-menu" class="header-menu-">
                    <div class="header-menu-logo">
                        <a href="<?php echo home_url('/'); ?>" title="<?php bloginfo('name'); ?>">
                            <picture>
                                <source media="(max-width: 600px)"
                                    srcset="<?php echo get_template_directory_uri(); ?>/src/assets/LogoMobile.svg">
                                <img src="<?php echo get_template_directory_uri(); ?>/src/assets/headerLogoWithText.svg"
                                    alt="Logo OnTheMove">
                            </picture>
                        </a>
                    </div>
                    <button class="header-menu-burger" id="header-menu-burger" aria-label="Menu">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span class="header-menu-burger-text">Menu</span>
                    </button>
                    <div class="header-menu-content" id="header-menu-content">
                        <?php
                        wp_nav_menu(array(
                            'theme_location' => 'Header',
                            'menu_id' => 'primary-menu',
                            'container' => false,
                            'menu_class' => 'primary-menu'
                        ));
                        ?>
                        <div class="header-menu-footer-mobile">
                            <div class="header-menu-footer-legal">
                                <?php
                                wp_nav_menu(array(
                                    'theme_location' => 'Footer',
                                    'menu_id' => 'footer-menu-mobile',
                                    'container' => false,
                                    'menu_class' => 'footer-menu-mobile'
                                ));
                                ?>
                            </div>
                            <div class="header-menu-lang-mobile">
                                <div class="header-menu-lang-fr">
                                    <a href="<?php echo function_exists('pll_home_url') ? pll_home_url('fr') : home_url('/'); ?>"
                                        style="<?php echo (get_locale() == 'en_US') ? 'color: #A58491;' : ''; ?>">FR</a>
                                </div>
                                <!-- Separator -->
                                <span class="header-menu-lang-separator">/</span>
                                <div class="header-menu-lang-en">
                                    <a href="<?php echo function_exists('pll_home_url') ? pll_home_url('en') : home_url('/en'); ?>"
                                        style="<?php echo (get_locale() == 'en_US') ? '' : 'color: #A58491;'; ?>">EN</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="header-menu-lang">
                        <div class="header-menu-lang-fr">
                            <a href="<?php echo function_exists('pll_home_url') ? pll_home_url('fr') : home_url('/'); ?>"
                                style="<?php echo (get_locale() == 'en_US') ? 'color: #A58491;' : ''; ?>">FR</a>
                        </div>
                        <!-- Separator -->
                        <span class="header-menu-lang-separator">/</span>
                        <div class="header-menu-lang-en">
                            <a href="<?php echo function_exists('pll_home_url') ? pll_home_url('en') : home_url('/en'); ?>"
                                style="<?php echo (get_locale() == 'en_US') ? '' : 'color: #A58491;'; ?>">EN</a>
                        </div>
                    </div>
                </nav>
            </div>
        </header>

        <main id="main" class="site-main">
            <div id="im-drawer">
                <h2 id="drawer-title"></h2>
                <p id="drawer-content"></p>
            </div>