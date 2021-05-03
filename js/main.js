//https://www.youtube.com/watch?v=_CsGSE5gwTA 31:19초까지 했음

const wordContainer = document.querySelector(".wordContainer"),
  words = wordContainer.querySelector("h1"),
  form = document.querySelector("form"),
  input = form.querySelector("input"),
  pointContainer = document.querySelector(".pointContainer"),
  time = pointContainer.querySelector(".time"),
  point = pointContainer.querySelector(".point"),
  button = document.querySelector(".button");

const GAME_TIME = 3;

let RandomWords = [];
let score = 0;
let wholeTime = GAME_TIME;
let isPlaying = false;
let timeInterval;
buttonChange("게임시작");

function run() {
  isPlaying = true;
  wholeTime = GAME_TIME;
  timeInterval = setInterval(countDown, 1000);
}

function buttonChange(text) {
  button.innerText = text;
  text === "게임시작"
    ? button.classList.remove("loading")
    : button.classList.add("loading");
}

function countDown() {
  wholeTime > 0 ? wholeTime-- : (isPlaying = false);
  if (!isPlaying) {
    clearInterval(timeInterval);
  }
  time.innerText = wholeTime;
}

function handleSubmit(event) {
  event.preventDefault();
  if (input.value.toLowerCase() === words.innerText.toLowerCase()) {
    score++;
    point.innerText = score;
    input.value = "";
  }
}

input.addEventListener("input", handleSubmit);

function matchWord() {
  const inputValue = input.value;
  const randomWordValue = words.value;
  if (inputValue === randomWordValue) {
    point.innerText = originPoint++;
  }
}

function loadWord() {}

function init() {
  loadWord();
}

init();
