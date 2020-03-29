// Menu Toggle
var open = false;
var tabletMode = window.matchMedia("(max-width: 937px)");
var menuButton = document.getElementById('toggle-menu');
var sideNav = document.getElementById('side-nav');
function toggleMenu() {
    open = !open;
    if (tabletMode.matches) {
        if (open) {
            sideNav.style.height = '350px';
            menuButton.classList.remove('brl');
            menuButton.style.animation = 'none';
            menuButton.offsetHeight;
            menuButton.style.animation = null; 
            menuButton.classList.add('rl');
        } else {
            sideNav.style.height = '65px';
            menuButton.classList.remove('rl');
            menuButton.style.animation = 'none';
            menuButton.offsetHeight;
            menuButton.style.animation = null; 
            menuButton.classList.add('brl');
        } 
    } else {
        if (open) {
            sideNav.style.width = '200px';
            menuButton.style.right = '25px';
            menuButton.classList.remove('brl');
            menuButton.style.animation = 'none';
            menuButton.offsetHeight;
            menuButton.style.animation = null; 
            menuButton.classList.add('rl');
        } else {
            sideNav.style.width = '0px';
            menuButton.style.right = '-50px';
            menuButton.classList.remove('rl');
            menuButton.style.animation = 'none';
            menuButton.offsetHeight;
            menuButton.style.animation = null; 
            menuButton.classList.add('brl');
        }
    }
};
        
// Toggle Nav Between Desktop and Mobile
function navToggle() {
    if (tabletMode.matches) {
        sideNav.style.height = '65px';
        sideNav.style.width = '100%';
        menuButton.style.right = 'auto';
    } else {
        sideNav.style.height = '100%';
        sideNav.style.width = '0px';
        menuButton.style.right = '-50px';
    }
};

window.addEventListener('scroll', () => {
    if (open) { toggleMenu(); }
});

window.addEventListener('resize', () => {
    window.requestAnimationFrame(navToggle);
    if (open) { toggleMenu(); }
});