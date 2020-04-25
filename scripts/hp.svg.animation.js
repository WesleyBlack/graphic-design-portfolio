window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function(f){return setTimeout(f, 1000/60)}
        
var ball = document.getElementById('flipper');
        
// Draws SVG Based off Div Positions
function drawSVG() {
    var pt1 = document.getElementById('pt1').getBoundingClientRect();
    var points = [
        { c1: 'c1', c2: 'c2', pt2: 'pt2' },
        { c1: 'c3', c2: 'c4', pt2: 'pt3' },
        { c1: 'c5', c2: 'c6', pt2: 'pt4' },
        { c1: 'c7', c2: 'c8', pt2: 'pt5' },
        { c1: 'c9', c2: 'c10', pt2: 'pt6' },
        { c1: 'c11', c2: 'c12', pt2: 'pt7' },
        { c1: 'c13', c2: 'c14', pt2: 'pt8' }
    ];
           
    var pointsOutput = " ";
    for (var i = 0; i < points.length; i++) {
        pointsOutput += ' C'+((document.getElementById(points[i].c1).getBoundingClientRect().width / 2) + (document.getElementById(points[i].c1).getBoundingClientRect().left + window.pageXOffset))+','+((document.getElementById(points[i].c1).getBoundingClientRect().height / 2) + (document.getElementById(points[i].c1).getBoundingClientRect().top + window.pageYOffset))+' '+((document.getElementById(points[i].c1).getBoundingClientRect().width / 2) + (document.getElementById(points[i].c2).getBoundingClientRect().left + window.pageXOffset))+','+((document.getElementById(points[i].c1).getBoundingClientRect().height / 2) + (document.getElementById(points[i].c2).getBoundingClientRect().top + window.pageYOffset))+' '+((document.getElementById(points[i].c1).getBoundingClientRect().width / 2) + (document.getElementById(points[i].pt2).getBoundingClientRect().left + window.pageXOffset))+','+((document.getElementById(points[i].c1).getBoundingClientRect().height / 2) + (document.getElementById(points[i].pt2).getBoundingClientRect().top + window.pageYOffset))
    }
           
    document.getElementById('rail-path').setAttribute('d', 'M'+((pt1.width / 2) + (pt1.left + window.pageXOffset))+','+((pt1.height / 2) + (pt1.top + window.pageYOffset))+pointsOutput);
};
        
// Collision Detection
function isCollide() {
    var aRect = document.getElementById('ball').getBoundingClientRect();
    var bRect = [
        { pos: 'identities', cla: 'bw1'},
        { pos: 'web', cla: 'bw2'},
        { pos: 'more', cla: 'bw3'}
    ];

    for (var i= 0; i < bRect.length; i++) {
        if (
            ((aRect.top + aRect.height) < (document.getElementById(bRect[i].pos).getBoundingClientRect().top)) ||
            (aRect.top > (document.getElementById(bRect[i].pos).getBoundingClientRect().top + document.getElementById(bRect[i].pos).getBoundingClientRect().height)) ||
            ((aRect.left + aRect.width) < document.getElementById(bRect[i].pos).getBoundingClientRect().left) ||
            (aRect.left > (document.getElementById(bRect[i].pos).getBoundingClientRect().left + document.getElementById(bRect[i].pos).getBoundingClientRect().width)) //Checks if Elements are not touching
        ) {
            document.getElementById(bRect[i].pos).classList.add(bRect[i].cla);
        } else {
            if (document.getElementById(bRect[i].pos).classList.contains(bRect[i].cla)) {
                document.getElementById(bRect[i].pos).classList.remove(bRect[i].cla);
            }
        }
    }
};

// Ball Animation Initial Settings
var scrollY = 0;
var speed = 0.08;
var path = document.getElementById('rail-path');
var pathLen = 0;

function pathLength() {
    pathLen = path.getTotalLength();
};
    
// Position the Ball on the SVG Path
function positionTheBall() {
    var scrollPercentage = (document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight);
    
    var distY = scrollPercentage - scrollY;
    
    scrollY = scrollY + (distY * speed);
  
    var pt = path.getPointAtLength(scrollY * pathLen);
            
    var pty = pt.y - document.documentElement.scrollTop;
  
    ball.style.webkitTransform=('translate3d('+ pt.x + 'px , ' + pty + 'px, 0px');
            
    isCollide();
    
    window.requestAnimationFrame(positionTheBall);
};
        
// Logo/Ball Flipper
var intersectionOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0
};
var intersectionElement = ['content', 'nav-flipper'];
        
// Change Class Based on Target's Visibility
function intersectionCallback(entries, observer) {
    entries.forEach(entry => {
    if (entry.intersectionRatio >= 1) {
        for (var i= 0; i < intersectionElement.length; i++) {
            if (document.getElementById(intersectionElement[i]).classList.contains('rsd')) {
                document.getElementById(intersectionElement[i]).classList.remove('rsd');
                document.getElementById(intersectionElement[i]).style.animation = 'none';
                document.getElementById(intersectionElement[i]).offsetHeight;
                document.getElementById(intersectionElement[i]).style.animation = null; 
                document.getElementById(intersectionElement[i]).classList.add('brsd');
            } 
        } 
    } else {
        for (var i= 0; i < intersectionElement.length; i++) {
            document.getElementById(intersectionElement[i]).classList.remove('brsd');
            document.getElementById(intersectionElement[i]).style.animation = 'none';
            document.getElementById(intersectionElement[i]).offsetHeight;
            document.getElementById(intersectionElement[i]).style.animation = null;
            document.getElementById(intersectionElement[i]).classList.add('rsd');
        }
    }
    });
}

var observer = new IntersectionObserver(intersectionCallback, intersectionOptions);
var target = document.querySelector('#box');
observer.observe(target);

// Update ball position when we get a resize event.
window.addEventListener('resize', () => {
    drawSVG();
    pathLength();
});
        
// Set the initial position of the ball.
drawSVG();
pathLength();
positionTheBall();
        
////// EDIT MODE //////
        
// Draws Connecting Lines Between Points and Handles 
function drawLines() {
    var pathHandles = [
        { c1: 'c1', pt1: 'pt1' },
        { c1: 'c2', pt1: 'pt2' },
        { c1: 'c3', pt1: 'pt2' },
        { c1: 'c4', pt1: 'pt3' },
        { c1: 'c5', pt1: 'pt3' },
        { c1: 'c6', pt1: 'pt4' },
        { c1: 'c7', pt1: 'pt4' },
        { c1: 'c8', pt1: 'pt5' },
        { c1: 'c9', pt1: 'pt5' },
        { c1: 'c10', pt1: 'pt6' },
        { c1: 'c11', pt1: 'pt6' },
        { c1: 'c12', pt1: 'pt7' },
        { c1: 'c13', pt1: 'pt7' },
        { c1: 'c14', pt1: 'pt8' }
    ];
    for (var i = 0; i < pathHandles.length; i++) {
        document.getElementById('path'+(i+1)).setAttribute('x1', (document.getElementById(pathHandles[i].c1).getBoundingClientRect().width / 2) + (document.getElementById(pathHandles[i].c1).getBoundingClientRect().left + window.pageXOffset));
        document.getElementById('path'+(i+1)).setAttribute('y1', (document.getElementById(pathHandles[i].c1).getBoundingClientRect().height / 2) + (document.getElementById(pathHandles[i].c1).getBoundingClientRect().top + window.pageYOffset));
        document.getElementById('path'+(i+1)).setAttribute('x2', (document.getElementById(pathHandles[i].pt1).getBoundingClientRect().width / 2) + (document.getElementById(pathHandles[i].pt1).getBoundingClientRect().left + window.pageXOffset));
        document.getElementById('path'+(i+1)).setAttribute('y2', (document.getElementById(pathHandles[i].pt1).getBoundingClientRect().height / 2) + (document.getElementById(pathHandles[i].pt1).getBoundingClientRect().top + window.pageYOffset));
    }
};
        
// Drag Points
var selected = null,
x_pos = 0, y_pos = 0,
x_elem = 0, y_elem = 0;

// Start of Element Dragging
function _drag_init(elem) {
    selected = elem;
    x_elem = x_pos - selected.offsetLeft;
    y_elem = y_pos - selected.offsetTop;
};

// Element Dragging
function _move_elem(e) {
    var bounds = document.getElementById("wrapper").getBoundingClientRect();
    var boundsPadding = document.body.getBoundingClientRect();
    x_pos = document.all ? window.event.clientX : e.pageX;
    y_pos = e.pageY;
    if (selected !== null) {
        selected.style.left = ((x_pos - bounds.left - (0.08 * boundsPadding.width)) / (bounds.width - (0.16 * boundsPadding.width)) * 100) + '%';
        selected.style.top = ((y_pos/window.innerHeight)*100) + 'vh';
        drawSVG();
        pathLength();
        drawLines();
    }
};

// Removes Bind
function _destroy() {
    selected = null;
};

// Bind the Functions
var anchors = ['c1','pt1','c2','pt2','c3','c4','pt3','c5','c6','pt4','c7','c8','pt5','c9','c10','pt6','c11','c12','pt7','c13','c14','pt8'];
for (var i = 0; i < anchors.length; i++) {
    document.getElementById(anchors[i]).onmousedown = function () {
        _drag_init(this);
        return false;
    }
    document.getElementById(anchors[i]).ontouchstart = function () {
        _drag_init(this);
        return false;
    }
};

// Toggle Edit Mode
var edit = false;
function editPath() {
    edit = !edit;
    selected = null;
    if (edit) {
        document.getElementById('rail-container').style.visibility='visible';
        document.onmousemove = _move_elem;
        document.onmouseup = _destroy;
        document.ontouchmove = _move_elem;
        document.ontouchend = _destroy;
        drawLines();
        window.addEventListener('resize', drawLines);
    } else {
        document.getElementById('rail-container').style.visibility='hidden';
        document.onmousemove = null;
        document.ontouchmove = null;
        window.removeEventListener('resize', drawLines);
    }
};