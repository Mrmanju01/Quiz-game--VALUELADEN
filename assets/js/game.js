// questions and game quiz
const question = document.querySelector("#question");
const currentScore = document.querySelector("#currentScore");
const progressBar = document.querySelector(".qz-progress-bar");
const gameDashboard = document.querySelector("#gameDashboard");
const answers = document.querySelector("#answers");

let displayedQuestion = null;
let acceptAnswer = false;
let score = 0;
let counterQuestion = 0;
let availableQuestions = [];
let bonus;

const EASY = "easy", MEDIUM = "medium", HARD = "hard";
const MAX_QUESTIONS = 10;

const startGame = () => {
    counterQuestion = 0;
    score = 0;
    availableQuestions = [...questions];

    if (difficultyLevel === EASY) {
        bonus = 10;
    } else if (difficultyLevel === MEDIUM) {
        bonus = 12;
    } else if (difficultyLevel === HARD) {
        bonus = 15;
    }

    if (!difficultyLevel || !categoryId) {
        $('#settingsModal').modal('show');
    } else {
        location.href = "#start";
        gameDashboard.classList.add("display");
        getNextQuestion();
    }
};

const getNextQuestion = () => {
    counterQuestion++;
    if (counterQuestion <= MAX_QUESTIONS) {
        progressBar.innerText = `${counterQuestion}/${MAX_QUESTIONS}`;
    }

    if (availableQuestions.length === 0) {
        $('#finalModal').modal('show');
        setHighScore();
        gameDashboard.classList.remove("display");
        return;
    }

    const indexQuestion = Math.floor(Math.random() * availableQuestions.length);
    displayedQuestion = availableQuestions[indexQuestion];
    question.innerText = `${counterQuestion}. ${decodeURIComponent(displayedQuestion.question)}`;

    answers.innerHTML = "";
    displayedQuestion.possible_answers.forEach((answer, index) => {
        const alphabet = ["A", "B", "C", "D"];
        const choiceContainer = document.createElement('div');
        choiceContainer.classList.add('answers-container', 'col-12', 'col-sm-5');
        choiceContainer.innerHTML = `
            <p class="answer-prefix">${alphabet[index]}</p>
            <p class="answer-choice" data-number=${index + 1}>${decodeURIComponent(answer)}</p>`;
        answers.appendChild(choiceContainer);
    });

    const choices = document.querySelectorAll(".answer-choice");
    choices.forEach(choice => {
        const number = choice.dataset.number;
        if (choice.innerText === decodeURIComponent(displayedQuestion.correct_answer)) {
            choice.setAttribute("id", "correct_answer");
        }
    });

    progressBar.style.width = `${(counterQuestion / MAX_QUESTIONS) * 100}%`;
    availableQuestions.splice(indexQuestion, 1);
    acceptAnswer = true;
    selectingChoice();
};

const selectingChoice = () => {
    const choices = document.querySelectorAll(".answer-choice");
    choices.forEach((choice) => {
        choice.addEventListener("click", (e) => {
            if (!acceptAnswer) return;
            acceptAnswer = false;
            const selectedChoice = e.target;
            const correctAnswer = document.querySelector('#correct_answer');
            const answerClass =
                selectedChoice.textContent === decodeURIComponent(displayedQuestion.correct_answer) ? "correct" : "incorrect";

            if (answerClass === "correct") {
                score += bonus;
                currentScore.innerText = score;
            }

            selectedChoice.parentElement.classList.add(answerClass);
            setTimeout(() => {
                selectedChoice.parentElement.classList.remove(answerClass);
                getNextQuestion();
            }, 600);
        });
    });
};

