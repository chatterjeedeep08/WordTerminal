const readline = require('readline');
const { getRandomWord, isValidWord, getWordFeedback } = require('./wordlist');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


console.log("Welcome to WordTerminal!");

let chosenWord = getRandomWord();
let maxAttempts = 6;
let score = maxAttempts;
let attempt = 0;
let totalScore = 0;

//console.log("(Debug Mode: The word is " + chosenWord + ")");

function isValidWordSemantic(word) {
    return /^[a-zA-Z]{5}$/.test(word);
}

function startNewRound(){
    chosenWord = getRandomWord();
    attempt = 0;
    console.log("🎲 New word chosen. Let's start!");
    //console.log("(Debug Mode: The word is " + chosenWord + ")");
    askForWord();
}

function postRoundMenu() {
    console.log("\n🎯 What would you like to do next?");
    console.log("1️⃣  Play another round");
    console.log("2️⃣  View total score");
    console.log("3️⃣  Exit the game");

    rl.question("👉 Enter your choice (1/2/3): ", (choice) => {
        if (choice === "1") {
            startNewRound();
        } else if (choice === "2") {
            console.log(`🏆 Your Total Score: ${totalScore}`);
            postRoundMenu(); // Show menu again
        } else if (choice === "3") {
            console.log("👋 Thanks for playing! Your final score: ", totalScore);
            rl.close();
        } else {
            console.log("❌ Invalid choice. Please enter 1, 2, or 3.");
            postRoundMenu();
        }
    });
}

function askForWord(){
    if (attempt >= maxAttempts) {
        console.log(`❌ Game Over! The word was: ${chosenWord}`);
        console.log("🏆 Your Score: 0");
        return postRoundMenu();
    }

    rl.question(`Attempt ${attempt+1}/${maxAttempts} : `, function(word){
        if (word === "exit") {
            console.log("👋 Thanks for playing! Your final score: ", totalScore);
            rl.close();
            return;
        }
        if(isValidWordSemantic(word)){
            if(!isValidWord(word)){
                console.log("Word not in dictionary. Please try again.");
                askForWord();
            }
            else if(word === chosenWord){
                let roundScore = maxAttempts - attempt;
                totalScore += roundScore;
                console.log(`🎉 Correct! You guessed the word in ${attempt + 1} tries.`);
                console.log(`🏆 Round Score: ${roundScore} | 🏅 Total Score: ${totalScore}`);
                return postRoundMenu();
            } else {
                let feedback = getWordFeedback(word, chosenWord)
                console.log(`Attempt ${attempt+1} : `+word.toUpperCase()+" ---> "+feedback);
                attempt++;
                score--;
                askForWord();
            }
        } else {
            console.log("Invalid word. Please enter a 5-letter word.");
            askForWord();
        }
    });
}

askForWord();