// Sending messages to background.js to control the timer
function startTimer() {
    const duration = timer.value;
    if (!isRunning) {
        isRunning = true;
        const [hr, min, sec] = duration.split(": ").map(Number);
        targetTime = Math.floor((Date.now() / 1000)) + timeToSeconds(hr, min, sec);
        timerInterval = setInterval(function () {
            updateTimer();
            if (targetTime <= Math.floor((Date.now() / 1000))) {
                clearInterval(timerInterval);
                timerInterval = undefined;
                isRunning = false;
                updateTimer();
            }
        }, 1000);

        // Send a message to background.js to start the timer
        chrome.runtime.sendMessage({ action: "startTimer", targetTime });
    }
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
