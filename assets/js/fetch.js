const fetchingData = async () => {
    const url = `https://opentdb.com/api.php?amount=10&category=${categoryId}&difficulty=${difficultyLevel}&encode=url3986`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        questions = data.results.map((importedQuestion) => {
            const formattedQuestion = {
                question: importedQuestion.question,
                possible_answers: [
                    importedQuestion.correct_answer,
                    ...importedQuestion.incorrect_answers,
                ],
                correct_answer: importedQuestion.correct_answer,
                incorrect_answers: [...importedQuestion.incorrect_answers],
            };
            const answerChoices = [...formattedQuestion.incorrect_answers];
            randomNumber = Math.floor(Math.random() * 3) + 1;
            answerChoices.splice(
                randomNumber - 1,
                0,
                formattedQuestion.correct_answer
            );

            answerChoices.forEach((choice, index) => {
                formattedQuestion["choice" + (index + 1)] = choice;
            });
            return formattedQuestion;
        });
        startGame();
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
};

const start = document.querySelector("#start");

start.addEventListener("click", fetchingData);
