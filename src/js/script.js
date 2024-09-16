
const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const scoreDisplay = document.getElementById('score');
const gameOverScreen = document.querySelector('.game-over');
const finalScoreDisplay = document.getElementById('final-score');
const restartButton = document.getElementById('restart');

let score = 0;
let isJumping = false;
let isGameOver = false;
let pipeAnimationInterval;

// Adiciona o evento de teclado
document.addEventListener('keydown', () => {
    if (!isJumping && !isGameOver) {
        jump();
    }
});

function jump() {
    isJumping = true;
    mario.classList.add('jump');
    
    setTimeout(() => {
        mario.classList.remove('jump');
        isJumping = false;
    }, 500); // O tempo deve ser igual ao da animação de pulo
}

function checkCollision() {
    const marioRect = mario.getBoundingClientRect();
    const pipeRect = pipe.getBoundingClientRect();
    
    if (
        marioRect.right > pipeRect.left &&
        marioRect.left < pipeRect.right &&
        marioRect.bottom > pipeRect.top &&
        marioRect.top < pipeRect.bottom
    ) {
        gameOver();
    }
}

function gameOver() {
    if (isGameOver) return;
    isGameOver = true;
    mario.classList.add('die'); // Adiciona a animação de morte

    // Altera a imagem do Mario para a de morte
    mario.src = 'src/imagens/game-over.png'; // Verifique se o caminho está correto

    // Para a animação dos tubos
    document.querySelectorAll('.pipe').forEach(pipe => {
        pipe.style.animationPlayState = 'paused';
    });

    // Para a verificação de colisão e a atualização da pontuação
    if (pipeAnimationInterval) {
        clearInterval(pipeAnimationInterval);
    }

    // Exibe a tela de Game Over
    gameOverScreen.style.display = 'block';
    finalScoreDisplay.textContent = score;
}

restartButton.addEventListener('click', () => {
    location.reload();
});

function updateScore() {
    if (isGameOver) return;
    score++;
    scoreDisplay.textContent = `Pontuação: ${score}`;
}

function startGame() {
    pipeAnimationInterval = setInterval(() => {
        if (!isGameOver) {
            checkCollision();
            updateScore();
        }
    }, 10);
}

startGame();
