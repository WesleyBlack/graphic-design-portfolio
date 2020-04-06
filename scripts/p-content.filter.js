var identities = document.getElementById('logos');
var webDesign = document.getElementById('web');
var andMore = document.getElementById('more');
var target = document.getElementById('categories').childNodes;
     
function categoriesChanged(hash) {
    if (hash == '#identities') {
        target[1].children[0].classList.add('selected');
        if (target[3].children[0].classList.contains('selected')) { target[3].children[0].classList.remove('selected') }
        if (target[5].children[0].classList.contains('selected')) { target[5].children[0].classList.remove('selected') }
    } else if (hash == '#web-design') {
        if (target[1].children[0].classList.contains('selected')) { target[1].children[0].classList.remove('selected') }
        target[3].children[0].classList.add('selected');
        if (target[5].children[0].classList.contains('selected')) { target[5].children[0].classList.remove('selected') }
    } else if (hash == '#other') {
        if (target[1].children[0].classList.contains('selected')) { target[1].children[0].classList.remove('selected') }
        if (target[3].children[0].classList.contains('selected')) { target[3].children[0].classList.remove('selected') }
        target[5].children[0].classList.add('selected');
    }
};

function hashChanged(hash) {
    if (hash == '#identities') {
        if (webDesign.classList.contains('show')) {
            webDesign.classList.remove('show');
            webDesign.classList.add('hide');
            setTimeout(function() {
                webDesign.style.display = 'none';
            }, 500);
        } else if (andMore.classList.contains('show')){
            andMore.classList.remove('show');
            andMore.classList.add('hide');
            setTimeout(function() {
                andMore.style.display = 'none';
            }, 500);
        };
        if (identities.classList.contains('hide')) {
            identities.classList.remove('hide');
            identities.classList.add('show');
            identities.style.display = 'inline-grid';
        };
        
    } else if (hash == '#web-design') {
        if (identities.classList.contains('show')) {
            identities.classList.remove('show');
            identities.classList.add('hide');
            setTimeout(function() {
                identities.style.display = 'none';
            }, 500);
        } else if (andMore.classList.contains('show')){
            andMore.classList.remove('show');
            andMore.classList.add('hide');
            setTimeout(function() {
                andMore.style.display = 'none';
            }, 500);
        };
        if (webDesign.classList.contains('hide')) {
            webDesign.classList.remove('hide');
            webDesign.classList.add('show');
            webDesign.style.display = 'inline-grid';
        };
    } else if (hash == '#other') {
        if (identities.classList.contains('show')) {
            identities.classList.remove('show');
            identities.classList.add('hide');
            setTimeout(function() {
                identities.style.display = 'none';
            }, 500);
        } else if (webDesign.classList.contains('show')){
            webDesign.classList.remove('show');
            webDesign.classList.add('hide');
            setTimeout(function() {
                webDesign.style.display = 'none';
            }, 500);
        };
        if (andMore.classList.contains('hide')) {
            andMore.classList.remove('hide');
            andMore.classList.add('show');
            andMore.style.display = 'inline-grid';
        };
    }
};
     
categoriesChanged(window.location.hash);
hashChanged(window.location.hash);
     
if ("onhashchange" in window) {
    window.onhashchange = function () {
        hashChanged(window.location.hash);
        categoriesChanged(window.location.hash);
     }
} else {
    var storedHash = window.location.hash;
    window.setInterval(function () {
        if (window.location.hash != storedHash) {
            storedHash = window.location.hash;
            hashChanged(storedHash);
            categoriesChanged(storedHash);
        }
    }, 100);
};
    
// Change Web Design to Web on Smaller Desplays
var smallDisplay = window.matchMedia('(max-width: 508px)');
     
function toggleText() {
    if (smallDisplay.matches) {
        target[3].children[0].innerHTML = 'Web';
    } else {
        target[3].children[0].innerHTML = 'Web Design';
    }
};
     
toggleText();
     
window.addEventListener('resize', () => {
    toggleText();
});