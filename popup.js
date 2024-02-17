document.getElementById("start").addEventListener("click", startTimer);
document.getElementById("pause").addEventListener("click", stopTimer);
document.getElementById("reset").addEventListener("click", resetTimer);
    

let timer = document.getElementById("timer");


// * Start the Timer
function startTimer() {
    const duration = timer.value;
    let targetTime = Math.floor((Date.now() / 1000)) + timeToSeconds(duration);
    
    // ! ------------------- Log -------------------
    console.log(duration);

    
    

    // let timerInterval = setInterval(function () {
         // updateTimer();
    //     if (targetTime <= Math.floor((Date.now() / 1000))) {
    //         clearInterval(timerInterval);
    //         timerInterval = undefined;
             // updateTimer();
    //     }
    // }, 1000);

    // Send a message to background.js to start the timer
    chrome.runtime.sendMessage({ action: "startTimer", targetTime });

}

function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = undefined;
    isRunning = false;
    updateTimer();

    // Send a message to background.js to stop the timer
    chrome.runtime.sendMessage({ action: "stopTimer" });
}

function resetTimer() {
    timer.value = "";
    clearInterval(timerInterval);
    timerInterval = undefined;
    isRunning = false;
    targetTime = 0;
    updateTimer();

    // Send a message to background.js to reset the timer
    chrome.runtime.sendMessage({ action: "resetTimer" });
}

// * Update the timer display
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {

    if (message.action === "updateTimerDisplay") {
        timer.value = secondsToTime(message.remainingTime);
    }

});


// ? --- Helper functions ---

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
function clearInterval() {
    timer.value = "";    
}

// // * Update the timer display
// function updateTimer() {
//     const remainingTime = Math.max(targetTime - Math.floor((Date.now() / 1000)), 0);
//     // if (remainingTime === 0) {
//     //     clearInterval(timerInterval);
//     //     isRunning = false;
//     // }
//     timer.value = secondsToTime(remainingTime);
// }
