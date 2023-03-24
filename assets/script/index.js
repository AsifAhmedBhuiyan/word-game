'use strict';

const words = ['dinosaur', 'love', 'pineapple', 'calendar', 'robot', 'building', 'population',
'weather', 'bottle', 'history', 'dream', 'character', 'money', 'absolute',
'discipline', 'machine', 'accurate', 'connection', 'rainbow', 'bicycle',
'eclipse', 'calculator', 'trouble', 'watermelon', 'developer', 'philosophy',
'database', 'periodic', 'capitalism', 'abominable', 'component', 'future',
'pasta', 'microwave', 'jungle', 'wallet', 'canada', 'coffee', 'beauty', 'agency',
'chocolate', 'eleven', 'technology', 'alphabet', 'knowledge', 'magician',
'professor', 'triangle', 'earthquake', 'baseball', 'beyond', 'evolution',
'banana', 'perfumer', 'computer', 'management', 'discovery', 'ambition', 'music',
'eagle', 'crown', 'chess', 'laptop', 'bedroom', 'delivery', 'enemy', 'button',
'superman', 'library', 'unboxing', 'bookstore', 'language', 'homework',
'fantastic', 'economy', 'interview', 'awesome', 'challenge', 'science', 'mystery',
'famous', 'league', 'memory', 'leather', 'planet', 'software', 'update', 'yellow',
'keyboard', 'window'];

let time = 99;
let score = 0;
let currentWord = '';

const timerElement = document.getElementById('time');
const scoreElement = document.getElementById('score');
const wordElement = document.getElementById('word');
const inputElement = document.getElementById('input');
const startButton = document.getElementById('start');
const audioElement = new Audio('./assets/audio/background-music.mp3');

let intervalId = null;

function startGame() {
  time = 99;
  score = 0;
  currentWord = '';

  updateScore();
  updateTimer();
  generateNewWord();
  inputElement.focus();

  if (intervalId !== null) {
    clearInterval(intervalId);
  }

  intervalId = setInterval(updateTimer, 1000);
  audioElement.play();
}

function endGame() {
  clearInterval(intervalId);
  intervalId = null;
  audioElement.pause();
  audioElement.currentTime = 0;

}

function updateScore() {
  scoreElement.textContent = score;
}

function updateTimer() {
  time--;
  timerElement.textContent = time;

  if (time <= 0) {
    endGame();
  }
}

function generateNewWord() {
  const randomIndex = Math.floor(Math.random() * words.length);
  currentWord = words[randomIndex];
  wordElement.textContent = currentWord;
}

inputElement.addEventListener('input', function () {
  if (inputElement.value === currentWord) {
    score++;
    updateScore();
    inputElement.value = '';
    generateNewWord();
    inputElement.focus();

    if (score === words.length) {
      endGame();
    }
  }
});

startButton.addEventListener('click', startGame);

class Score {
  #date;
  #hits;
  #percentage;

  constructor(date, hits, percentage) {
    this.#date = date;
    this.#hits = hits;
    this.#percentage = percentage;
  }

  get date() {
    return this.#date;
  }
  
  get hits() {
    return this.#hits;
  }
  
  get percentage() {
    return this.#percentage;
  }
  
  set date(date) {
    this.#date = date;
  }
  
  set hits(hits) {
    this.#hits = hits;
  }
  
  set percentage(percentage) {
    this.#percentage = percentage;
  }
}
  
function saveScoreToLocal(scoreObject) {
  let scores = [];
  const existingScores = localStorage.getItem('scores');

  if (existingScores !== null) {
    const scoreStrings = existingScores.split(',');
    scores = scoreStrings.map(scoreString => {
      const scoreParts = scoreString.split(',');
      const date = scoreParts[0];
      const hits = parseInt(scoreParts[1]);
      const percentage = parseInt(scoreParts[2]);
      return new Score(date, hits, percentage);
    });
  }

  scores.push(scoreObject);
  const scoreStrings = scores.map(score => `${score.date},${score.hits},${score.percentage}`);
  const scoresString = scoreStrings.join(',');
  localStorage.setItem('scores', scoresString);
}

function displayScores() {
  const existingScores = localStorage.getItem('scores');

  if (existingScores !== null) {
    const scoreStrings = existingScores.split(',');
    const scores = scoreStrings.map(scoreString => {
      const scoreParts = scoreString.split(',');
      const date = scoreParts[0];
      const hits = parseInt(scoreParts[1]);
      const percentage = parseInt(scoreParts[2]);
      return new Score(date, hits, percentage);
    });

    scores.sort((a, b) => b.date.localeCompare(a.date));

    scores.forEach(score => {
      const row = document.createElement('tr');

      const dateCell = document.createElement('td');
      dateCell.textContent = score.date;
      row.appendChild(dateCell);

      const hitsCell = document.createElement('td');
      hitsCell.textContent = score.hits;
      row.appendChild(hitsCell);

      const percentageCell = document.createElement('td');
      percentageCell.textContent = score.percentage + '%';
      row.appendChild(percentageCell);
    });
  }
}





  