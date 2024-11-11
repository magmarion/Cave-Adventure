window.addEventListener("DOMContentLoaded", main);


function main() {

}

function startGame() {

    document.getElementById("title").style.display = "none";
    document.getElementById("startScreen").style.display = "none";

    /* Show the game interface */
    document.getElementById("sceneContainer").style.display = "flex";

}


function showScene() {
    const content = document.getElementById("content");
    const options = document.getElementById("options");

    content.innerHTML = ""; /* Clear previous content */
    options.innerHTML = ""; /* Clear previous options */

    /* Define the text  based on the scene */
    let sceneText = "";

    switch (scene) {
        case "story":
            sceneText = `A young man wakes up in a dark cave, alone and disoriented. The only thing he remembers is a mysterious map hidden in his pocket, showing the way to a legendary treasure, the lost ark.`;
            break;

        case "explore":
            sceneText = `Following the whisper, he discovers an old sage who gives him a clue to the treasure. The Old Sage: "The wilderness is unforgiving. Learn to read the signs, and you'll find your way"`;
            break;

    }
}


function typeText(text, callback) {
    const storyTextElement = document.getElementById("content");
    storyTextElement.textContent = "";
    storyTextElement.style.display = "block"; /* Show the story text */

    let letterIndex = 0;
    const typingSpeed = 5;

    function type() {
        if (letterIndex < text.length) {
            storyTextElement.textContent += text[letterIndex];
            letterIndex++;
            setTimeout(type, typingSpeed);
        } else {
            if (callback) callback();
        }
    }

    type();
}


function changeBackground() {


}