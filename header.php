<!DOCTYPE html>
<html <?php language_attributes(); ?>>

<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
    <?php wp_body_open(); ?>

    <div id="page" class="site">
        <header id="header" class="header">
            <div class="container">
                <nav id="header-menu" class="header-menu-">
                    <div class="header-menu-logo">
                        <picture>
                            <source media="(max-width: 600px)"
                                srcset="<?php echo get_template_directory_uri(); ?>/src/assets/LogoMobile.svg">
                            <img src="<?php echo get_template_directory_uri(); ?>/src/assets/headerLogoWithText.svg"
                                alt="Logo OnTheMove">
                        </picture>
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
                        <div class="header-menu-lang-mobile">
                            <div class="header-menu-lang-fr">
                                <a href="<?php echo home_url(); ?>/"
                                    style="<?php echo (get_locale() == 'en_US') ? 'color: #A58491;' : ''; ?>">FR</a>
                            </div>
                            <!-- Separator -->
                            <span class="header-menu-lang-separator">/</span>
                            <div class="header-menu-lang-en">
                                <a href="<?php echo home_url(); ?>/en"
                                    style="<?php echo (get_locale() == 'en_US') ? '' : 'color: #A58491;'; ?>">EN</a>
                            </div>
                        </div>
                    </div>
                    <div class="header-menu-lang">
                        <div class="header-menu-lang-fr">
                            <a href="<?php echo home_url(); ?>/"
                                style="<?php echo (get_locale() == 'en_US') ? 'color: #A58491;' : ''; ?>">FR</a>
                        </div>
                        <!-- Separator -->
                        <span class="header-menu-lang-separator">/</span>
                        <div class="header-menu-lang-en">
                            <a href="<?php echo home_url(); ?>/en"
                                style="<?php echo (get_locale() == 'en_US') ? '' : 'color: #A58491;'; ?>">EN</a>
                        </div>
                    </div>
                </nav>
            </div>
        </header>

        <main id="main" class="site-main">