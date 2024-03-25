const startButton = document.querySelector("#start");

startButton.addEventListener("click", () => {
    const categoryId = document.querySelector("#categories").value;
    const difficultyLevel = document.querySelector("#difficulty").value;
    
    if (!categoryId || !difficultyLevel) {
        console.error("Please select both category and difficulty level.");
        return;
    }
    
    fetchingData(categoryId, difficultyLevel);
});

const fetchingData = async (categoryId, difficultyLevel) => {
    const url = `https://opentdb.com/api.php?amount=10&category=${categoryId}&difficulty=${difficultyLevel}&encode=url3986`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Failed to fetch data from API");
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
            };

            return formattedQuestion;
        });

        startGame();
    } catch (error) {
        console.error(error);
    }
};
