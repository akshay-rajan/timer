// DOM Elements
const timer = document.getElementById("duration");
const start = document.getElementById("start");
const pause = document.getElementById("pause");
const reset = document.getElementById("reset");
const timeup = document.getElementById("alert");

// Calling the functions on click of the respective buttons
start.addEventListener("click", function() {
    if (!inputVerify(timer.value)) {
        console.log("Invalid Input!");
        return;
    }
    startTimer();
    if (pause.hasAttribute("hidden")) {
        pause.removeAttribute("hidden");
        start.setAttribute("hidden", "true");
    }
});
pause.addEventListener("click", function() {
    stopTimer();
    if (start.hasAttribute("hidden")) {
        start.removeAttribute("hidden");
        pause.setAttribute("hidden", "true");
    }
});
reset.addEventListener("click", function(){
    resetTimer();
    start.removeAttribute("hidden");
    pause.setAttribute("hidden", "true");
});


// Automatically enter ': ' after every two characters are entered
timer.onkeydown = function () {
    var len = timer.value.length;
    if (len > 0 && len < 10) {
        if (len % 2 == 0) {
            timer.value += ": ";
        }
    }
    // Replace characters except non-negative integers, ' ', and ':'
    const regex = /^[0-9: ]\d*$/;
    if (!regex.test(timer.value)) {
        timer.value = timer.value.replace(/[^1-9: \d]/g, '');
    }
}


// Variables
let timerInterval;
let targetTime;
let isRunning = false;


// Function to start the timer
function startTimer() {
    const duration = timer.value;
    if (!isRunning) {
        isRunning = true;
        const [hr, min, sec] = duration.split(": ").map(Number);
        targetTime = Math.floor((Date.now() / 1000)) + timeToSeconds(hr, min, sec);
        timerInterval = setInterval( function () {
            updateTimer();
            if (targetTime <= Math.floor((Date.now() / 1000))) {
                clearInterval(timerInterval);
                timerInterval = undefined;
                isRunning = false;
                updateTimer();
            }
        }, 1000);
    }
}

// Function to stop the timer
function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = undefined;
    isRunning = false;
    updateTimer();
}

// Function to reset the timer
function resetTimer() {
    timer.value = "";
    clearInterval(timerInterval);
    timerInterval = undefined;
    isRunning = false;
    targetTime = 0;
    updateTimer();
}


// Take the number of seconds as input, format time as HH: MM: SS,
function formatTime(seconds) {
    const hr = Math.floor(seconds / 3600);
    const min = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return (
      String(hr).padStart(2, "0") + ": " + String(min).padStart(2, "0") + ": " + String(remainingSeconds).padStart(2, "0")
    );
}


// Update the timer display
function updateTimer() {
    const remainingTime = Math.max(targetTime - Math.floor((Date.now() / 1000)), 0);
    timer.value = formatTime(remainingTime);

    // Alert the user when timer hits 0
    if (remainingTime === 0) {
        if (isRunning) {
            timeOver();
        }
        timer.value = "";
        clearInterval(timerInterval);
        isRunning = false;
    }
}


// Convert time to seconds, takes hours, minutes and seconds of type integer as arguments
function timeToSeconds(hours, minutes, seconds) {
    return hours * 3600 + minutes * 60 + seconds;
}

// When time is up, display an alert
function timeOver() {
    if (timer.value === "00: 00: 00") {
        // Switch buttons
        if (start.hasAttribute("hidden")) {
            start.removeAttribute("hidden");
            pause.setAttribute("hidden", "true");
        }
        // Create notification
        chrome.notifications.create({
            type: "basic",
            iconUrl: "assets/timer.png",
            title: "Timer for Chrome",
            message: "Time's Up!"
          });
    }
}


// Check whether input is of proper format
function inputVerify(duration) {
    const regex = /^(0[0-9]|1[0-2]): ([0-5][0-9]): ([0-5][0-9])$/;
    if (regex.test(duration)) {
        return true;
    } else {
        return false;
    }
}
