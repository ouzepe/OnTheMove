// Menu burger functionality
document.addEventListener('DOMContentLoaded', () => {
	const burger = document.querySelector('.header-menu-burger');
	const menuContent = document.querySelector('.header-menu-content');
	const menuItems = document.querySelectorAll('.menu-item-has-children');

	// Toggle burger menu
	if (burger && menuContent) {
		burger.addEventListener('click', () => {
			burger.classList.toggle('active');
			menuContent.classList.toggle('active');
		});
	}

	// Toggle submenu on mobile
	menuItems.forEach((item) => {
		const link = item.querySelector('a');
		const submenu = item.querySelector('.sub-menu');

		if (link && submenu) {
			link.addEventListener('click', (e) => {
				// Only prevent default and toggle on mobile
				if (window.innerWidth <= 768) {
					e.preventDefault();
					item.classList.toggle('active');
					submenu.classList.toggle('active');
				}
			});
		}
	});

	// Close menu when clicking outside
	document.addEventListener('click', (e) => {
		const target = e.target as HTMLElement;
		if (
			burger &&
			menuContent &&
			!target.closest('.header-menu-burger') &&
			!target.closest('.header-menu-content')
		) {
			burger.classList.remove('active');
			menuContent.classList.remove('active');
		}
	});

	// Close menu on window resize if switching to desktop
	window.addEventListener('resize', () => {
		if (window.innerWidth > 768 && burger && menuContent) {
			burger.classList.remove('active');
			menuContent.classList.remove('active');
			menuItems.forEach((item) => {
				item.classList.remove('active');
				const submenu = item.querySelector('.sub-menu');
				if (submenu) {
					submenu.classList.remove('active');
				}
			});
		}
	});
});
