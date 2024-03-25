// Fetching questions from API based on selected category and difficulty
const startButton = document.querySelector("#start");

startButton.addEventListener("click", () => {
    // Get selected category and difficulty
    const categoryId = document.querySelector("#categories").value;
    const difficultyLevel = document.querySelector("#difficulty").value;
    
    if (!categoryId || !difficultyLevel) {
        // Show a message or modal indicating that the user needs to select both category and difficulty
        console.error("Please select both category and difficulty level.");
        return;
    }
    
    // Fetch questions based on selected category and difficulty
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
            // Format questions...
        });

        startGame(); // Assuming startGame() function is available globally
    } catch (error) {
        console.error(error);
    }
};
