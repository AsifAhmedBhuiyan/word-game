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

let time = 5;
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
  time = 5;
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

  const hits = score;
  const percentage = Math.round((score / words.length) * 100);
  const date = new Date().toLocaleDateString();

  const scoreObject = new Score(date, hits, percentage);
  saveScoreToLocal(scoreObject);

  
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

// initialize the scores array
let scores = [];

// Retrieve scores from localStorage, if any
const scoresJSON = localStorage.getItem('scores');
if (scoresJSON !== null) {
  scores = JSON.parse(scoresJSON);
}

// Function to update the scores array with a new score
function updateScores(hits, percentage) {
  // Add a new Player object to the scores array
  scores.push(new Score(hits, percentage));

  // Sort the scores array by hits, descending order
  scores.sort((a, b) => b.hits - a.hits);

  // Only keep the top 9 scores
  scores.splice(9);

  // Save the updated scores array to localStorage
  localStorage.setItem('scores', JSON.stringify(scores));
}

// Example usage to update scores after a game
updateScores();

// Function to display the scores in a table
function displayScores() {
  const table = document.createElement('table');

  // Add header row
  const headerRow = document.createElement('tr');
  const headerHits = document.createElement('th');
  headerHits.textContent = 'Hits';
  const headerPercentage = document.createElement('th');
  headerPercentage.textContent = 'Percentage';
  headerRow.appendChild(headerHits);
  headerRow.appendChild(headerPercentage);
  table.appendChild(headerRow);

  // Add rows for each score
  for (const score of scores) {
    const row = document.createElement('tr');
    const hits = document.createElement('td');
    hits.textContent = score.hits;
    const percentage = document.createElement('td');
    percentage.textContent = score.percentage;
    row.appendChild(hits);
    row.appendChild(percentage);
    table.appendChild(row);
  }

  // Add the table to the page
  const container = document.getElementById('scoreboard');
  container.innerHTML = '';
  container.appendChild(table);
}

// Example usage to display scores
displayScores();



 