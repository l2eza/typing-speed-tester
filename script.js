// Get the sample text, input field, timer, pause button, reset button, and character count
const sampleText = document.getElementById('sample-text').textContent.trim();
const userInput = document.getElementById('user-input');
const timer = document.getElementById('timer');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const charCount = document.getElementById('char-count');

// Initialize variables for the timer
let startTime;
let timeInterval;
let totalTime = 0;
let charTyped = 0;

// Format the elapsed time into a string with the format HH:MM:SS
function formatTime(time) {
  const date = new Date(time);
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  const seconds = date.getUTCSeconds().toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

// Start the timer when the user starts typing
userInput.addEventListener('keydown', function(event) {
  if (event.keyCode === 32 || event.keyCode >= 48 && event.keyCode <= 90 || event.keyCode >= 186 && event.keyCode <= 222) {
    if (!timeInterval) {
      startTimer();
    }
  }
});

// Update the timer every 10 milliseconds
function updateTimer() {
  const elapsedTime = Date.now() - startTime + totalTime;
  const formattedTime = formatTime(elapsedTime);
  timer.textContent = formattedTime;
}

// Start the timer
function startTimer() {
  startTime = Date.now();
  timeInterval = setInterval(updateTimer, 10);
}

// Pause the timer
pauseBtn.addEventListener('click', function() {
  clearInterval(timeInterval);
  timeInterval = null;
  totalTime += Date.now() - startTime;
});

// Reset the timer and clear the input field
resetBtn.addEventListener('click', function() {
  clearInterval(timeInterval);
  timeInterval = null;
  totalTime = 0;
  charTyped = 0;
  userInput.textContent = '';
  timer.textContent = '00:00:00';
  charCount.textContent = 'Characters typed: 0';
});

// Update the character count and check for accuracy after each keypress
userInput.addEventListener('input', function() {
  const userString = userInput.textContent.trim();
  const userArray = userString.split('');
  const sampleArray = sampleText.split('');
  let correctChars = 0;
  for (let i = 0; i < userArray.length; i++) {
    if (userArray[i] === sampleArray[i]) {
      correctChars++;
    }
  }
  charTyped = userString.length;
  charCount.textContent = 'Characters typed: ' + charTyped;
});
