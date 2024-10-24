// script.js

let startTime, elapsedTime = 0, timerInterval;
let lapCount = 0;

function startTimer() {
    startTime = Date.now() - elapsedTime; // Adjust for any elapsed time
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime; // Calculate elapsed time
        updateDisplay(elapsedTime);
    }, 10); // Update every 10 milliseconds
}

function stopTimer() {
    clearInterval(timerInterval); // Stop the timer
}

function resetTimer() {
    clearInterval(timerInterval); // Stop the timer if running
    elapsedTime = 0; // Reset elapsed time
    updateDisplay(elapsedTime); // Update display
    document.querySelector('.laps').innerHTML = ''; // Clear lap times
    lapCount = 0; // Reset lap count
}

function updateDisplay(time) {
    const milliseconds = Math.floor((time % 1000) / 10);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    
    const displayTime =
        `${pad(minutes)}:${pad(seconds)}:${pad(Math.floor(milliseconds))}`;
    
    document.querySelector('.display').textContent = displayTime; // Update display
}

function pad(num) {
    return num.toString().padStart(2, '0'); // Ensure two digits
}

function recordLap() {
    lapCount++;
    
    const lapTime = document.createElement('div');
    
    const lapDisplayTime = updateLapDisplay(elapsedTime);
    
    lapTime.textContent = `Lap ${lapCount}: ${lapDisplayTime}`;
    
    document.querySelector('.laps').appendChild(lapTime); // Append new lap time to laps section
}

function updateLapDisplay(time) {
    const milliseconds = Math.floor((time % 1000) / 10);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    
    return `${pad(minutes)}:${pad(seconds)}:${pad(Math.floor(milliseconds))}`;
}

// Event listeners for buttons
document.querySelector('.start').addEventListener('click', startTimer);
document.querySelector('.stop').addEventListener('click', stopTimer);
document.querySelector('.reset').addEventListener('click', resetTimer);
document.querySelector('.lap').addEventListener('click', recordLap);