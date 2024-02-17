document.getElementById("start").addEventListener("click", startTimer);
document.getElementById("pause").addEventListener("click", stopTimer);
document.getElementById("reset").addEventListener("click", resetTimer);
    
let timer = document.getElementById("timer");


// ! --- Buttons ---

function startTimer() {
    const duration = timer.value;
    if (timeToSeconds(duration) <= 0) {
        return;
    }
    let targetTime = Math.floor((Date.now() / 1000)) + timeToSeconds(duration);
    
    // Send a message to background.js to start the timer
    chrome.runtime.sendMessage({ action: "startTimer", targetTime });
}

function stopTimer() {
    chrome.runtime.sendMessage({ action: "stopTimer" });
}

function resetTimer() {
    chrome.runtime.sendMessage({ action: "resetTimer" });
    clearTimer();
}


// ! --- Background ---

// * Update the timer display
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {

    if (message.action === "updateTimerDisplay") {
        timer.value = secondsToTime(message.remainingTime);
    }

});


// ! --- Helper functions ---

// * Functions to convert time in the format "hh: mm: ss" to seconds and back
function timeToSeconds(duration) {
    const [hr, min, sec] = duration.split(": ").map(Number);
    return hr * 3600 + min * 60 + sec;
}
function secondsToTime(seconds) {
    const hr = Math.floor(seconds / 3600).toString().padStart(2, "0");
    const min = Math.floor((seconds % 3600) / 60).toString().padStart(2, "0");
    const sec = (seconds % 60).toString().padStart(2, "0");
    return `${hr}: ${min}: ${sec}`;
}

// * Clear the timer
function clearTimer() {
    timer.value = "";    
}

