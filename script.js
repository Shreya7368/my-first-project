let currentUser = null;
let score = 100;
let time = 0;
let timerInterval;
let hintUsed = false;

const puzzle = {
    question: "What is 8 × 4?",
    answer: "32",
    hint: "Multiply 8 by 4."
};

function login() {
    const username = document.getElementById("username").value.trim();

    if (username === "") {
        alert("Enter username");
        return;
    }

    currentUser = username;
    localStorage.setItem("username", username);

    // Hide login
    document.getElementById("authSection").classList.add("hidden");
    document.getElementById("gameSection").classList.remove("hidden");

    document.getElementById("welcome").innerText = "Welcome, " + username;
    document.getElementById("question").innerText = puzzle.question;

    // Clear leaderboard display on login
    document.getElementById("leaderboard").innerHTML = "";
    document.getElementById("leaderboardSection").classList.add("hidden");

    startTimer();
}

function logout() {
    localStorage.clear();
    location.reload();
}

function startTimer() {
    timerInterval = setInterval(() => {
        time++;
        document.getElementById("timer").innerText = time;

        if (time % 60 === 0) {
            score -= 5;
            updateScore();
        }
    }, 1000);
}

function updateScore() {
    if (score < 10) score = 10;
    document.getElementById("score").innerText = score;
}

function useHint() {
    if (!hintUsed) {
        alert(puzzle.hint);
        score -= 10;
        updateScore();
        hintUsed = true;
    }
}

function submitAnswer() {
    const userAnswer = document.getElementById("answer").value.trim();

    if (userAnswer === puzzle.answer) {
        clearInterval(timerInterval);
        saveScore();
        alert("Correct! Final Score: " + score);
    } else {
        alert("Incorrect Answer!");
    }
}

function saveScore() {
    let leaderboard = [];

    // Only save current user score
    leaderboard.push({
        name: currentUser,
        score: score
    });

    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));

    displayLeaderboard();
}

function displayLeaderboard() {
    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    let list = document.getElementById("leaderboard");

    list.innerHTML = "";

    leaderboard.forEach(user => {
        let li = document.createElement("li");
        li.innerText = user.name + " - " + user.score;
        list.appendChild(li);
    });

    document.getElementById("leaderboardSection").classList.remove("hidden");
}


