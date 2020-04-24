// Reverse Animations Before Changing Page
var splitText = document.getElementById('split-text');
var splitImgs = document.getElementById('split-photos');

const workLinks = document.querySelectorAll('#work-selctor a');

for (var i = 0; i < workLinks.length; i++) {
    workLinks[i].addEventListener('click', function (event) {
        var workUrl = event.target.parentElement.href;
        
        if (event.target.classList.contains('current')) {
            window.location = workUrl;
        } else {
            event.preventDefault();
        
            splitText.style.animation = 'none';
            splitText.offsetHeight;
            splitText.style.animation = null; 
            splitText.classList.add('bft');
            splitImgs.style.animation = 'none';
            splitImgs.offsetHeight;
            splitImgs.style.animation = null; 
            splitImgs.classList.add('bfb');
            setTimeout(function() {
                window.location = workUrl;
            }, 500);
        }
    });
};

// Fix for Safari's Back/Forward Cashe
window.addEventListener("pagehide", function() {
    splitText.classList.remove('bft');
    splitImgs.classList.remove('bfb');
});