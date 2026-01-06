var numberOfStars = 50,
    starElements = [],
    starX = [],
    starY = [],
    x = 0,
    y = 0,
    ox = 0,
    oy = 0;

function createStar(x, y) {
    var star = document.createElement('div');
    star.className = 'star';
    star.textContent = '☆';
    star.style.left = x + 'px';
    star.style.top = y + 'px';
    star.style.visibility = 'hidden';
    document.body.appendChild(star);
    return star;
}

function setupStars() {
    for (var i = 0; i < numberOfStars; i++) {
        starElements[i] = createStar(-100, -100);
        starX[i] = false;
        starY[i] = false;
    }
    setInterval(updateStars, 20);
}

function updateStars() {
    // Cria novas estrelas perto do mouse, mesmo se ele estiver parado
    for (var i = 0; i < numberOfStars; i++) {
        if (starY[i] === false) {
            // pequena aleatoriedade em volta do mouse
            starX[i] = x + (Math.random() - 0.5) * 20;
            starY[i] = y + (Math.random() - 0.5) * 20;
            starElements[i].style.left = starX[i] + 'px';
            starElements[i].style.top = starY[i] + 'px';
            starElements[i].style.visibility = 'visible';
        }
    }

    // Atualiza posição das estrelas
    for (var i = 0; i < numberOfStars; i++) {
        if (starY[i] !== false) {
            starY[i] -= 1; // sobe
            starX[i] += (Math.random() - 0.5) * 2; // oscilação horizontal
            if (starY[i] < 0 || starX[i] < 0 || starX[i] > window.innerWidth) {
                starElements[i].style.visibility = 'hidden';
                starY[i] = false;
            } else {
                starElements[i].style.top = starY[i] + 'px';
                starElements[i].style.left = starX[i] + 'px';
            }
        }
    }
    ox = x;
    oy = y;
}

document.onmousemove = function(e) {
    x = e.pageX;
    y = e.pageY;
}

window.onload = setupStars;

document.addEventListener('click', function() {
    var soundIndex = Math.floor(Math.random() * 2);
    var sound = document.getElementById('click-sound' + (soundIndex + 1));
    if (sound) {
        sound.currentTime = 0;
        sound.play();
    }
});
