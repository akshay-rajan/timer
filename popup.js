const timer = document.getElementById("timer");
const start = document.getElementById("start");
const pause = document.getElementById("pause");
const reset = document.getElementById("reset");


start.addEventListener("click", startTimer);
pause.addEventListener("click", stopTimer);
reset.addEventListener("click", resetTimer);


// ! --- Buttons ---

function startTimer() {
    const duration = timer.value;
    if (timeToSeconds(duration) <= 0 || !inputVerify(duration)) {
        return;
    }
    let targetTime = Math.floor((Date.now() / 1000)) + timeToSeconds(duration);
    
    // Send a message to background.js to start the timer
    chrome.runtime.sendMessage({ action: "startTimer", targetTime });

    if (pause.hasAttribute("hidden")) {
        pause.removeAttribute("hidden");
        start.setAttribute("hidden", "true");
    }
}

function stopTimer() {
    chrome.runtime.sendMessage({ action: "stopTimer" });

    if (start.hasAttribute("hidden")) {
        start.removeAttribute("hidden");
        pause.setAttribute("hidden", "true");
    }
}

function resetTimer() {
    chrome.runtime.sendMessage({ action: "resetTimer" });
    clearTimer();

    if (start.hasAttribute("hidden")) {
        start.removeAttribute("hidden");
        pause.setAttribute("hidden", "true");
    }
}


// ! --- Background ---

// * Update the timer display
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {

    if (message.action === "updateTimerDisplay") {
        timer.value = secondsToTime(message.remainingTime);
        if (message.remainingTime === 0) {
            timer.value = "";
            if (start.hasAttribute("hidden")) {
                start.removeAttribute("hidden");
                pause.setAttribute("hidden", "true");
            }
        }
    }

});


// ! --- Helper functions ---

// * Functions to convert time in the format "hh: mm: ss" to seconds and back
function timeToSeconds(duration) {
    const [hr, min, sec] = duration.split(":").map(Number);
    return hr * 3600 + min * 60 + sec;
}
function secondsToTime(seconds) {
    const hr = Math.floor(seconds / 3600).toString().padStart(2, "0");
    const min = Math.floor((seconds % 3600) / 60).toString().padStart(2, "0");
    const sec = (seconds % 60).toString().padStart(2, "0");
    return `${hr}:${min}:${sec}`;
}

// * Clear the timer
function clearTimer() {
    timer.value = "";    
}

// * Check whether the timer input is of the right format
function inputVerify(duration) {
    const regex = /^(0[0-9]|1[0-2]):([0-5][0-9]):([0-5][0-9])$/;
    return regex.test(duration);
}

// * Add ":" to input field
document.getElementById('timer').addEventListener('input', (event) => {
    let value = event.target.value;
    
    if (event.inputType === 'deleteContentBackward' || event.inputType === 'deleteContentForward') {
        // Handle delete key press
        if (value.length === 3 || value.length === 6) {
            event.target.value = value.substring(0, value.length - 1);
        }
    } else {
        // Handle other input
        if (value.length === 2 || value.length === 5) {
            event.target.value += ':';
        }
    }
});