
const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const scoreDisplay = document.getElementById('score');
const gameOverScreen = document.querySelector('.game-over');
const finalScoreDisplay = document.getElementById('final-score');
const restartButton = document.getElementById('restart');
const musicaFundo = document.getElementById('musicaFundo');

let score = 0;
let isJumping = false;
let isGameOver = false;
let pipeAnimationInterval;
let velocidadeCano = 5;
let ultimaAtualizacao = 0;
musicaFundo.volume = 0.25;

// Adiciona o evento de teclado
document.addEventListener('keydown', () => {
    if (!isJumping && !isGameOver) {
        jump();
    }
});

document.addEventListener('touchstart', function() {
    jump();
});

function ajustarVelocidade() {
    let larguraTela = window.innerWidth;
    let larguraCano = 80; // Largura do cano em pixels
    let velocidade = 1000; // Velocidade desejada em pixels por segundo

    // Calcule a duração da animação com base na largura da tela e na largura do cano
    let duracao = (larguraTela + larguraCano) / velocidade; // Duração em segundos

    document.querySelectorAll('.pipe').forEach(pipe => {
        pipe.style.animationDuration = `${duracao}s`;
    });
}

// Chama a função para ajustar a velocidade inicialmente e ao redimensionar a tela
ajustarVelocidade();
window.addEventListener('resize', ajustarVelocidade);



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

// Função para reiniciar o jogo
function reiniciarJogo() {
    location.reload();
}

// Adiciona o evento de teclado
document.addEventListener('keydown', function(event) {
    if (gameOverScreen.style.display === 'block') {
        reiniciarJogo();
    }
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
