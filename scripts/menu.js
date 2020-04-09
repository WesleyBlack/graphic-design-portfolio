// Set vh to window.innerHeight
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

// Menu Toggle
var open = false;
var tabletMode = window.matchMedia('(max-width: 937px)');
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
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});

// Close Nav Before Going to Link
const links = document.querySelectorAll('#links a');

for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function (event) {
        var url = event.target.href;
    
        event.preventDefault();
    
        if (open) { 
            toggleMenu();
            setTimeout(function() {
                window.location = url;
            }, 500);
        } else {
            window.location = url;
        }
    });
};