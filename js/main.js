const wordContainer = document.querySelector(".wordContainer"),
  words = wordContainer.querySelector("h1"),
  form = document.querySelector("form"),
  input = form.querySelector("input"),
  pointContainer = document.querySelector(".pointContainer"),
  time = pointContainer.querySelector(".time"),
  point = pointContainer.querySelector(".point"),
  button = document.querySelector(".button");

const GAME_TIME = 12;

let checkInterval;
let RandomWords = [];
let score = 0;
let wholeTime = GAME_TIME;
let isPlaying = false;
let timeInterval;

function checkStatus() {
  if (!isPlaying && wholeTime === 0) {
    buttonChange("게임시작");
    clearInterval(checkInterval);
  }
}

function run() {
  if (isPlaying) {
    return;
  }
  isPlaying = true;
  wholeTime = GAME_TIME;
  input.focus();
  point.innerText = 0;
  timeInterval = setInterval(countDown, 1000);
  checkInterval = setInterval(checkStatus, 5);
  buttonChange("게임중~~!");
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

function handleSubmit() {
  if (input.value.toLowerCase() === words.innerText.toLowerCase()) {
    input.value = "";
    if (!isPlaying) {
      return;
    }
    score++;
    point.innerText = score;
    wholeTime = GAME_TIME;
    const randomIndex = Math.floor(Math.random() * RandomWords.length);
    words.innerText = RandomWords[randomIndex];
  }
}

function loadWord() {
  axios
    .get("https://random-word-api.herokuapp.com/word?number=100")
    .then(function (response) {
      RandomWords = response.data;

      buttonChange("게임시작");
      console.log(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
}

function init() {
  loadWord();
  buttonChange("게임로딩중...");
  input.addEventListener("input", handleSubmit);
}

init();
