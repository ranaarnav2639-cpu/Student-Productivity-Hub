const today = new Date();

document.getElementById("today").textContent =
    today.toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });

const hour = today.getHours();

let greeting = "Good Evening";

if (hour < 12) {
    greeting = "Good Morning";
} else if (hour < 17) {
    greeting = "Good Afternoon";
}

document.getElementById("greeting").textContent =
    greeting + ", Student! 👋";


// TASK MANAGEMENT

let tasks = JSON.parse(localStorage.getItem("studentTasks")) || [];

function saveTasks() {
    localStorage.setItem("studentTasks", JSON.stringify(tasks));
}

function addTask() {

    const input = document.getElementById("taskInput");

    const taskName = input.value.trim();

    if (taskName === "") {
        alert("Please enter a task!");
        return;
    }

    tasks.push({
        id: Date.now() + Math.random(),
        name: taskName,
        completed: false
    });

    input.value = "";

    saveTasks();
    displayTasks();
}

function displayTasks() {

    const taskList = document.getElementById("taskList");

    taskList.replaceChildren();

    if (tasks.length === 0) {
        const message = document.createElement("p");
        message.className = "empty";
        message.textContent = "No tasks yet. Add your first task!";
        taskList.appendChild(message);
    }

    tasks.forEach(function(task) {

        const div = document.createElement("div");

        div.className = task.completed
            ? "task completed"
            : "task";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        checkbox.addEventListener("change", function() {
            task.completed = checkbox.checked;
            saveTasks();
            displayTasks();
        });

        const span = document.createElement("span");
        span.textContent = task.name;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete";

        deleteButton.addEventListener("click", function() {
            tasks = tasks.filter(function(item) {
                return item.id !== task.id;
            });

            saveTasks();
            displayTasks();
        });

        div.appendChild(checkbox);
        div.appendChild(span);
        div.appendChild(deleteButton);

        taskList.appendChild(div);

    });

    updateStats();
}

function updateStats() {

    const total = tasks.length;

    const completed = tasks.filter(function(task) {
        return task.completed;
    }).length;

    const remaining = total - completed;

    const percentage = total === 0
        ? 0
        : Math.round((completed / total) * 100);

    document.getElementById("totalTasks").textContent = total;

    document.getElementById("completedTasks").textContent = completed;

    document.getElementById("remainingTasks").textContent = remaining;

    document.getElementById("completionRate").textContent =
        percentage + "%";

    document.getElementById("progressBar").style.width =
        percentage + "%";

    document.getElementById("progressText").textContent =
        "You have completed " + percentage + "% of your tasks.";
}

document.getElementById("taskInput").addEventListener(
    "keydown",
    function(event) {
        if (event.key === "Enter") {
            addTask();
        }
    }
);


// POMODORO TIMER

let timeLeft = 25 * 60;

let timerInterval = null;

let isRunning = false;

let isFocus = true;

function updateTimerDisplay() {

    const minutes = Math.floor(timeLeft / 60);

    const seconds = timeLeft % 60;

    document.getElementById("timerDisplay").textContent =
        String(minutes).padStart(2, "0") + ":" +
        String(seconds).padStart(2, "0");
}

function startTimer() {

    if (isRunning) return;

    isRunning = true;

    document.getElementById("timerMessage").textContent =
        "Keep going! Stay focused.";

    timerInterval = setInterval(function() {

        if (timeLeft > 0) {

            timeLeft--;

            updateTimerDisplay();

        } else {

            clearInterval(timerInterval);

            timerInterval = null;

            isRunning = false;

            document.getElementById("timerMessage").textContent =
                isFocus
                ? "Great work! Time for a break."
                : "Break is over! Ready to study?";

            alert(isFocus
                ? "Focus session completed! Take a break."
                : "Break completed! Time to focus.");

        }

    }, 1000);
}

function pauseTimer() {

    clearInterval(timerInterval);

    timerInterval = null;

    isRunning = false;

    document.getElementById("timerMessage").textContent =
        "Timer paused.";

}

function resetTimer() {

    pauseTimer();

    timeLeft = isFocus ? 25 * 60 : 5 * 60;

    updateTimerDisplay();

    document.getElementById("timerMessage").textContent =
        "Timer reset.";

}

function switchMode() {

    pauseTimer();

    isFocus = !isFocus;

    timeLeft = isFocus ? 25 * 60 : 5 * 60;

    document.getElementById("timerMode").textContent =
        isFocus ? "Focus Time" : "Break Time";

    updateTimerDisplay();

    document.getElementById("timerMessage").textContent =
        isFocus ? "Time to concentrate!" : "Relax and recharge!";

}


// QUICK NOTES

const notes = document.getElementById("notes");

notes.value = localStorage.getItem("studentNotes") || "";

function saveNotes() {

    localStorage.setItem("studentNotes", notes.value);

    document.getElementById("noteMessage").textContent =
        "Your notes have been saved successfully!";

}


// DAILY MOTIVATION

const quotes = [

    "Believe you can and you're halfway there.",

    "Great things are done by a series of small things brought together.",

    "Don't watch the clock; do what it does. Keep going.",

    "Success is the result of preparation and hard work.",

    "Your future is created by what you do today.",

    "Small progress is still progress.",

    "Dream big, work hard and stay consistent."

];

function newQuote() {

    const randomIndex = Math.floor(Math.random() * quotes.length);

    document.getElementById("quoteText").textContent =
        '"' + quotes[randomIndex] + '"';

}


// INITIALIZE WEBSITE

displayTasks();

updateTimerDisplay();
