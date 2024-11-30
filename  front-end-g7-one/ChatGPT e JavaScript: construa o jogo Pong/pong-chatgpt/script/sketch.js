let paddle1, paddle2, ball;
let playerScore = 0; // Pontuação do jogador
let aiScore = 0; // Pontuação da IA
let imagemBola;
let raqueteJogador;
let raqueteComputador;
let imagemFundo;
let ballRotation = 0; // Ângulo de rotação da bola
let soundRaquete, soundReset; // Variáveis para os sons

function preload() {
    // Carregar as imagens
    imagemFundo = loadImage('sprites/fundo1.png');
    imagemBola = loadImage('sprites/bola.png');
    raqueteJogador = loadImage('sprites/barra01.png');
    raqueteComputador = loadImage('sprites/barra02.png');
    
    // Carregar os sons
    soundRaquete = loadSound('sound/bater-bola-raquete.wav');
    soundReset = loadSound('sound/som-reset.wav');
}

function setup() {
    createCanvas(800, 400); // Cria um canvas de 800x400 pixels
    
    // Inicializando a bola
    ball = {
        x: width / 2,
        y: height / 2,
        dx: 4, // Velocidade horizontal
        dy: 3, // Velocidade vertical
        size: 25
    };

    // Inicializando as raquetes
    paddle1 = {
        x: 10,
        y: height / 2 - 35, // Centraliza a raquete
        width: 10,
        height: 70
    };
    
    paddle2 = {
        x: width - 20,
        y: height / 2 - 35, // Centraliza a raquete
        width: 10,
        height: 70
    };
}

function draw() {
    // Desenhar o fundo do jogo com a imagem
    image(imagemFundo, 0, 0, width, height);

    // Desenhar a raquete do jogador com a imagem
    image(raqueteJogador, paddle1.x, paddle1.y, paddle1.width, paddle1.height);

    // Desenhar a raquete da IA com a imagem
    image(raqueteComputador, paddle2.x, paddle2.y, paddle2.width, paddle2.height);

    // Desenhar a bola com rotação
    push(); // Salva o estado atual do canvas
    translate(ball.x, ball.y); // Move o ponto de origem para a posição da bola
    rotate(ballRotation); // Aplica a rotação
    imageMode(CENTER); // Define o modo de desenho da imagem
    image(imagemBola, 0, 0, ball.size, ball.size); // Desenha a bola rotacionada
    pop(); // Restaura o estado original do canvas

    // Atualizar lógica do jogo
    updateGame();
}

function updateGame() {
    // Desenhando as bordas
    fill(255); // Cor branca
    rect(0, 0, width, 5); // Borda superior
    rect(0, height - 5, width, 5); // Borda inferior

    // Atualizando a posição da raquete do jogador (com o mouse)
    paddle1.y = constrain(mouseY, 5, height - paddle1.height - 5);

    // Atualizando a posição da raquete da IA
    let aiSpeed = 2.5; // Velocidade da IA
    if (ball.y < paddle2.y + paddle2.height / 2) {
        paddle2.y -= aiSpeed;
    } else if (ball.y > paddle2.y + paddle2.height / 2) {
        paddle2.y += aiSpeed;
    }
    paddle2.y = constrain(paddle2.y, 5, height - paddle2.height - 5);

    // Atualizando a posição da bola
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Calculando a velocidade total da bola
    let speed = sqrt(ball.dx ** 2 + ball.dy ** 2);
    
    // Atualizando o ângulo de rotação da bola com base na velocidade
    ballRotation += speed * 0.1;

    // Detectando colisões com as bordas superiores/inferiores
    if (ball.y - ball.size / 2 <= 5 || ball.y + ball.size / 2 >= height - 5) {
        ball.dy *= -1;
    }

    // Detectando colisão com a raquete do jogador (paddle1)
    if (
        ball.x - ball.size / 2 <= paddle1.x + paddle1.width &&
        ball.y >= paddle1.y &&
        ball.y <= paddle1.y + paddle1.height
    ) {
        ball.dx *= -1; // Inverte direção horizontal
        ball.x = paddle1.x + paddle1.width + ball.size / 2; // Reposiciona para evitar bug visual

        // Adicionando aleatoriedade no ângulo de rebote
        let impactPoint = ball.y - (paddle1.y + paddle1.height / 2);
        ball.dy += impactPoint * 0.1;

        // Garantindo aumento de velocidade
        ball.dx *= 1.1; // Incrementa a velocidade horizontal
        ball.dy *= 1.1; // Incrementa a velocidade vertical

        // Tocar som de colisão com a raquete
        soundRaquete.play();
    }

    // Detectando colisão com a raquete da IA (paddle2)
    if (
        ball.x + ball.size / 2 >= paddle2.x &&
        ball.y >= paddle2.y &&
        ball.y <= paddle2.y + paddle2.height
    ) {
        ball.dx *= -1; // Inverte direção horizontal
        ball.x = paddle2.x - ball.size / 2; // Reposiciona para evitar bug visual

        // Adicionando aleatoriedade no ângulo de rebote
        let impactPoint = ball.y - (paddle2.y + paddle2.height / 2);
        ball.dy += impactPoint * 0.1;

        // Garantindo aumento de velocidade
        ball.dx *= 1.1; // Incrementa a velocidade horizontal
        ball.dy *= 1.1; // Incrementa a velocidade vertical

        // Tocar som de colisão com a raquete
        soundRaquete.play();
    }

    // Detectando se a bola ultrapassou os limites horizontais (pontuação)
    if (ball.x < 0) {
        aiScore++; // A IA ganha um ponto
        resetBall(); // Reseta a bola no centro
    } else if (ball.x > width) {
        playerScore++; // O jogador ganha um ponto
        resetBall(); // Reseta a bola no centro
    }

    // Exibindo o placar
    textSize(32);
    fill(255);
    text(playerScore, width / 4, 40); // Placar do jogador
    text(aiScore, (width / 4) * 3, 40); // Placar da IA
}

// Função para resetar a bola no centro do canvas
function resetBall() {
    ball.x = width / 2;
    ball.y = height / 2;

    // Velocidade inicial reduzida
    ball.dx = random([-3, 3]); // Direção horizontal aleatória
    ball.dy = random([-2, 2]); // Direção vertical aleatória

    // Tocar som de reset
    soundReset.play();
}
