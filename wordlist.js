const fs = require("fs");
const path = require("path");

const wordsFilePath = path.join(__dirname, "./words.txt");
const userWordsFilePath = path.join(__dirname, "./user_words.txt");

const words = fs.readFileSync(wordsFilePath, "utf8")
    .split("\n")
    .map(word => word.trim().toLowerCase())
    .filter(word => word.length == 5);

const wordsSet = new Set(
    fs.readFileSync(userWordsFilePath, "utf8")
    .split("\n")
    .map(word => word.trim().toLowerCase())
    .filter(word => word.length == 5)
);

function getRandomWord(){
    return words[Math.floor(Math.random()*words.length)]
}

function isValidWord(word) {
    return wordsSet.has(word.toLowerCase());
}

function getWordFeedback(word, chosenWord){
    word = word.toLowerCase();
    chosenWord = chosenWord.toLowerCase();

    let feedback = Array(5).fill("⬜"); //🟨🟩
    let correctLetters = chosenWord.split("");

    for(let i = 0; i < word.length; i++){
        if(word[i] === correctLetters[i]){
            feedback[i] = "🟩";
            correctLetters[i] = null;
        }
    }

    for(let i = 0; i < word.length; i++){
        if(feedback[i] === "🟩") continue;
        let index = correctLetters.indexOf(word[i]);
        if(index !== -1){
            feedback[i] = "🟨";
            correctLetters[index] = null;
        }
    }

    return feedback.join("");
}

module.exports = {getRandomWord, isValidWord, getWordFeedback};