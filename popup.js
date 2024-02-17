document.getElementById("start").addEventListener("click", startTimer);
document.getElementById("pause").addEventListener("click", stopTimer);
document.getElementById("reset").addEventListener("click", resetTimer);
    


// * Start the Timer
function startTimer() {

    let timer = document.getElementById("timer");
    const duration = timer.value;
    const [hr, min, sec] = duration.split(": ").map(Number);
    let targetTime = Math.floor((Date.now() / 1000)) + timeToSeconds(hr, min, sec);
    
    // ! ------------------- Log -------------------
    console.log(targetTime);
    

    // let timerInterval = setInterval(function () {
    //     // updateTimer();
    //     if (targetTime <= Math.floor((Date.now() / 1000))) {
    //         clearInterval(timerInterval);
    //         timerInterval = undefined;
    //         // updateTimer();
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


// ? --- Helper functions ---

function timeToSeconds(hours, minutes, seconds) {
    return hours * 3600 + minutes * 60 + seconds;
}
