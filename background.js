let timerInterval;
let targetTime;
let isRunning = false;

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {

    if (message.action === "startTimer") {

        if (!isRunning) {
            isRunning = true;
            targetTime = message.targetTime;
            timerInterval = setInterval(function () {
                updateTimer();
                if (targetTime <= Math.floor((Date.now() / 1000))) {
                    clearInterval(timerInterval);
                    timerInterval = undefined;
                    isRunning = false;
                    updateTimer();
                }
            }, 1000);
        }

    } else if (message.action === "stopTimer") {

        clearInterval(timerInterval);
        timerInterval = undefined;
        isRunning = false;
        updateTimer();

    } else if (message.action === "resetTimer") {

        clearInterval(timerInterval);
        timerInterval = undefined;
        isRunning = false;
        targetTime = 0;
        updateTimer();
        
    }
});

// * Update the timer if the popup is open
function updateTimer() {
    const remainingTime = Math.max(targetTime - Math.floor((Date.now() / 1000)), 0);
    chrome.runtime.sendMessage({ action: "updateTimerDisplay", remainingTime });
    if (remainingTime === 0) {
        if (isRunning) {
            timeOver();
        }
        isRunning = false;
    }
}

function timeOver() {
    if (isRunning) {
        chrome.notifications.create({
            type: "basic",
            iconUrl: "assets/timer.png",
            title: "Timer for Chrome",
            message: "Time's Up!"
        });
    }
}
