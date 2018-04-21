const sidenavContainer = document.querySelector('.sidenav-container');
const sidenav = document.querySelector('.sidenav');
const sidenavToggle = document.querySelector('.sidenav-toggle');

function toggleNav() {
		sidenavContainer.classList.add('open');	
		document.body.classList.add('no-scroll');
}

function closeNav() {
	sidenavContainer.classList.remove('open');
	document.body.classList.remove('no-scroll');
}

function blockClicks(e) {
	e.stopPropagation();
}

sidenav.addEventListener('click', blockClicks);
sidenavToggle.addEventListener('click', toggleNav);
sidenavContainer.addEventListener('click', closeNav);
