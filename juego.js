const figures = [
  {
    description: "Tengo 4 lados iguales y 4 ángulos rectos",
    answer: ["cuadrado"],
    img: "cuadrado.png"
  },
  {
    description: "Tengo 3 lados y 3 ángulos",
    answer: ["triángulo", "triangulo"],
    img: "triangulo.png"
  },
  {
    description: "Tengo 4 lados, pero solo los lados opuestos son iguales",
    answer: ["rectángulo", "rectangulo"],
    img: "rectangulo.png"
  },
  {
    description: "Soy redondo y no tengo lados",
    answer: ["círculo", "circulo"],
    img: "circulo.png"
  },
  {
    description: "Tengo 5 lados",
    answer: ["pentágono", "pentagono"],
    img: "pentagono.png"
  },
  {
    description: "Tengo 6 lados",
    answer: ["hexágono", "hexagono"],
    img: "hexagono.png"
  }
];

let currentIndex = 0;
let attempts = 5;
let score = 0;
let gameOver = false;

const comprobarBtn = document.getElementById('comprobarBtn');
const salirBtn = document.getElementById('salirBtn');
const restartBtn = document.getElementById('restartBtn');

const seleccionSound = document.getElementById('seleccion-sound');
const eleccionfigSound = document.getElementById('eleccionfig-sound');
const colorearSound = document.getElementById('colorear-sound');

function updateAttemptsDisplay() {
  document.getElementById("attempts").textContent = `Intentos restantes: ${attempts}`;
}

function loadFigure() {
  if (gameOver) return;
  const figure = figures[currentIndex];
  document.getElementById("description").textContent = figure.description;
  document.getElementById("result").textContent = "";
  document.getElementById("answer").value = "";

  const figureImg = document.getElementById("figure-img");
  figureImg.style.display = "none";
  figureImg.src = "";

  updateAttemptsDisplay();
}

function checkAnswer() {
  if (gameOver) return;

  seleccionSound.play();

  const input = document.getElementById("answer").value.trim().toLowerCase();
  const correctAnswers = figures[currentIndex].answer.map(ans => ans.toLowerCase());
  const result = document.getElementById("result");
  const figureImg = document.getElementById("figure-img");

  if (correctAnswers.includes(input)) {
    result.textContent = "¡Correcto!";
    result.style.color = "green";
    figureImg.src = figures[currentIndex].img;
    figureImg.style.display = "block";
    score += 1;
  } else {
    attempts--;
    updateAttemptsDisplay();
    result.textContent = "Incorrecto.";
    result.style.color = "red";
  }

  setTimeout(() => {
    currentIndex++;
    if (currentIndex < figures.length) {
      loadFigure();
    } else {
      gameOver = true;
      alert(`¡Juego finalizado! Tu puntaje final es ${score} de ${figures.length}.`);
      document.getElementById("result").textContent = "¡Juego finalizado!";
      document.getElementById("result").style.color = "blue";
      document.getElementById("game-over-buttons").style.display = "block";
    }
  }, 1500);
}

function restartGame() {
  colorearSound.play();
  colorearSound.onended = () => {
    figures.sort(() => Math.random() - 0.5);
    currentIndex = 0;
    attempts = 5;
    score = 0;
    gameOver = false;
    document.getElementById("game-over-buttons").style.display = "none";
    document.getElementById("result").textContent = "";
    loadFigure();
  };
}

function exitGame() {
  const confirmExit = confirm("¿Estás seguro de que quieres salir del juego?");
  if (confirmExit) {
    eleccionfigSound.play();
    setTimeout(() => {
      window.location.href = "index.html";
    }, 1000);
  }
}

comprobarBtn.addEventListener('click', checkAnswer);
salirBtn.addEventListener('click', exitGame);
restartBtn.addEventListener('click', restartGame);

window.onload = () => {
  figures.sort(() => Math.random() - 0.5);
  loadFigure();
};
