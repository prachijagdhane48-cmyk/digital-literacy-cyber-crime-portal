/* =========================================
   CYBERSAFE APP - FINAL JAVASCRIPT
========================================= */


/* =========================
   SCREEN NAVIGATION
========================= */

function showScreen(screenId) {

    const screens = document.querySelectorAll(".app-screen");

    screens.forEach(screen => {
        screen.classList.remove("active-screen");
    });

    const selectedScreen = document.getElementById(screenId);

    if (selectedScreen) {
        selectedScreen.classList.add("active-screen");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    if (screenId === "quizScreen") {
        loadQuestion();
    }

    if (screenId === "reportScreen") {
        displayReports();
    }
}


/* =========================
   DARK MODE
========================= */

function toggleTheme() {

    document.body.classList.toggle("dark-mode");

    const button = document.getElementById("themeButton");

    if (document.body.classList.contains("dark-mode")) {
        button.textContent = "☀️";
        localStorage.setItem("cyberTheme", "dark");
    } else {
        button.textContent = "🌙";
        localStorage.setItem("cyberTheme", "light");
    }
}


function loadTheme() {

    const savedTheme = localStorage.getItem("cyberTheme");

    if (savedTheme === "dark") {

        document.body.classList.add("dark-mode");

        const button = document.getElementById("themeButton");

        if (button) {
            button.textContent = "☀️";
        }
    }
}


/* =========================
   THREAT SEARCH
========================= */

function searchCrimes() {

    const searchInput = document.getElementById("crimeSearch");

    if (!searchInput) return;

    const searchText =
        searchInput.value.toLowerCase().trim();

    const cards =
        document.querySelectorAll(".crime-card");

    cards.forEach(card => {

        const cardText =
            card.textContent.toLowerCase();

        if (cardText.includes(searchText)) {
            card.style.display = "flex";
        } else {
            card.style.display = "none";
        }

    });
}


/* =========================
   PASSWORD CHECKER
========================= */

function checkPassword() {

    const input =
        document.getElementById("passwordInput");

    const result =
        document.getElementById("passwordStrength");

    if (!input || !result) return;

    const password = input.value;

    if (password.length === 0) {

        result.textContent =
            "Enter a password to check its strength.";

        return;
    }

    let score = 0;

    if (password.length >= 12) score++;

    if (/[A-Z]/.test(password)) score++;

    if (/[a-z]/.test(password)) score++;

    if (/[0-9]/.test(password)) score++;

    if (/[^A-Za-z0-9]/.test(password)) score++;


    if (score <= 2) {

        result.textContent =
            "🔴 Weak Password";

    } else if (score <= 4) {

        result.textContent =
            "🟡 Medium Password";

    } else {

        result.textContent =
            "🟢 Strong Password";

    }
}


/* =========================
   QUIZ DATA
========================= */

const quizQuestions = [

    {
        question:
            "What should you do if someone asks for your OTP?",

        options: [
            "Share it immediately",
            "Never share it",
            "Post it online",
            "Send it to a friend"
        ],

        answer: 1
    },

    {
        question:
            "Which is a common sign of phishing?",

        options: [
            "A normal greeting",
            "A strong password",
            "A suspicious link asking for urgent action",
            "A software update"
        ],

        answer: 2
    },

    {
        question:
            "What should you do after a cyber financial fraud?",

        options: [
            "Ignore it",
            "Delete all evidence",
            "Contact your bank immediately and report the incident",
            "Share your PIN"
        ],

        answer: 2
    }

];


let currentQuestion = 0;

let quizScore = 0;

let quizStarted = false;


/* =========================
   LOAD QUIZ QUESTION
========================= */

function loadQuestion() {

    const questionNumber =
        document.getElementById("questionNumber");

    const question =
        document.getElementById("quizQuestion");

    const options =
        document.getElementById("quizOptions");

    const result =
        document.getElementById("quizResult");

    const nextButton =
        document.getElementById("nextQuestion");


    if (!question || !options) return;


    const current =
        quizQuestions[currentQuestion];


    questionNumber.textContent =
        "Question " +
        (currentQuestion + 1) +
        " of " +
        quizQuestions.length;


    question.textContent =
        current.question;


    options.innerHTML = "";

    result.textContent = "";

    nextButton.style.display = "none";


    current.options.forEach((option, index) => {

        const button =
            document.createElement("button");

        button.textContent = option;

        button.onclick = function () {

            selectAnswer(index);

        };

        options.appendChild(button);

    });


    updateQuizScore();

    quizStarted = true;
}


/* =========================
   SELECT ANSWER
========================= */

function selectAnswer(selectedIndex) {

    const current =
        quizQuestions[currentQuestion];

    const buttons =
        document.querySelectorAll("#quizOptions button");

    const result =
        document.getElementById("quizResult");

    const nextButton =
        document.getElementById("nextQuestion");


    buttons.forEach(button => {

        button.disabled = true;

    });


    if (selectedIndex === current.answer) {

        quizScore++;

        result.textContent =
            "✅ Correct answer!";

    } else {

        result.textContent =
            "❌ Incorrect. Correct answer: " +
            current.options[current.answer];

    }


    nextButton.style.display =
        "inline-block";


    updateQuizScore();
}


/* =========================
   NEXT QUESTION
========================= */

function nextQuestion() {

    currentQuestion++;


    if (currentQuestion < quizQuestions.length) {

        loadQuestion();

    } else {

        finishQuiz();

    }
}


/* =========================
   FINISH QUIZ
========================= */

function finishQuiz() {

    const questionNumber =
        document.getElementById("questionNumber");

    const question =
        document.getElementById("quizQuestion");

    const options =
        document.getElementById("quizOptions");

    const result =
        document.getElementById("quizResult");

    const nextButton =
        document.getElementById("nextQuestion");


    questionNumber.textContent =
        "Quiz Completed 🎉";


    question.textContent =
        "Great job! You completed the Cyber Safety Quiz.";


    options.innerHTML = "";


    result.textContent =
        "Your final score: " +
        quizScore +
        " / " +
        quizQuestions.length;


    nextButton.textContent =
        "Restart Quiz";


    nextButton.style.display =
        "inline-block";


    nextButton.onclick =
        restartQuiz;


    updateQuizScore();
}


/* =========================
   RESTART QUIZ
========================= */

function restartQuiz() {

    currentQuestion = 0;

    quizScore = 0;


    const nextButton =
        document.getElementById("nextQuestion");


    nextButton.textContent =
        "Next Question";


    nextButton.onclick =
        nextQuestion;


    loadQuestion();
}


/* =========================
   QUIZ SCORE
========================= */

function updateQuizScore() {

    const score =
        document.getElementById("quizScore");

    if (!score) return;

    score.textContent =
        "Score: " +
        quizScore +
        " / " +
        quizQuestions.length;
}


/* =========================
   REPORT STORAGE
========================= */

let reports =
    JSON.parse(
        localStorage.getItem("cyberReports")
    ) || [];


/* =========================
   SUBMIT REPORT
========================= */

function submitReport(event) {

    event.preventDefault();


    const name =
        document.getElementById("reportName").value.trim();

    const crimeType =
        document.getElementById("crimeType").value;

    const date =
        document.getElementById("incidentDate").value;

    const description =
        document.getElementById("reportDescription").value.trim();

    const message =
        document.getElementById("reportMessage");


    if (
        !name ||
        !crimeType ||
        !date ||
        !description
    ) {

        message.textContent =
            "⚠️ Please fill in all fields.";

        return;
    }


    const newReport = {

        name: name,

        crimeType: crimeType,

        date: date,

        description: description

    };


    reports.push(newReport);


    localStorage.setItem(
        "cyberReports",
        JSON.stringify(reports)
    );


    message.textContent =
        "✅ Report saved successfully on this device.";


    document.getElementById(
        "reportForm"
    ).reset();


    displayReports();
}


/* =========================
   DISPLAY REPORTS
========================= */

function displayReports() {

    const reportList =
        document.getElementById("reportList");


    if (!reportList) return;


    reportList.innerHTML = "";


    if (reports.length === 0) {

        reportList.innerHTML =
            "<p>No reports submitted yet.</p>";

        return;
    }


    reports.forEach((report, index) => {

        const reportBox =
            document.createElement("div");


        reportBox.className =
            "saved-report";


        reportBox.innerHTML = `

            <h4>Report #${index + 1}</h4>

            <p>
                <strong>Incident:</strong>
                ${escapeHTML(report.crimeType)}
            </p>

            <p>
                <strong>Date:</strong>
                ${escapeHTML(report.date)}
            </p>

            <p>
                <strong>Description:</strong>
                ${escapeHTML(report.description)}
            </p>

        `;


        reportList.appendChild(reportBox);

    });
}


/* =========================
   HTML SECURITY
========================= */

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}


/* =========================
   START APP
========================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadTheme();

        showScreen("homeScreen");

        displayReports();

    }
);