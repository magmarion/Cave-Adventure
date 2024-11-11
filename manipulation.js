window.addEventListener("DOMContentLoaded", main);


function main() {

}

function startGame() {

    document.getElementById("title").style.display = "none";
    document.getElementById("startScreen").style.display = "none";

    /* Show the game interface */
    document.getElementById("sceneContainer").style.display = "flex";


    /* Change the background for the first scene */
    changeBackground('story');

    /*Define the text for the first scene */
    const storyText = `A young man wakes up in a dark cave, alone and disoriented. The only thing he remembers is a mysterious map hidden in his pocket, showing the way to a legendary treasure, the lost ark.`;

    /* Start the typing for the first scene */
    typeText(storyText, () => {
        setTimeout(() => showWhisperOptions(), 500);
    });
}


function showScene(scene) {
    const content = document.getElementById("content");
    const options = document.getElementById("options");

    content.innerHTML = ""; /* Clear previous content */
    options.innerHTML = ""; /* Clear previous buttons */

    changeBackground(scene);

    /* Define the text  based on the scene */
    let sceneText = "";

    switch (scene) {
        case "story":
            sceneText = `A young man wakes up in a dark cave, alone and disoriented. The only thing he remembers is a mysterious map hidden in his pocket, showing the way to a legendary treasure, the lost ark.`;
            typeText(sceneText, () => {
                setTimeout(() => showWhisperOptions(), 500);
            });
            break;


        case "explore":
            sceneText = `Following the whisper, he discovers an old sage who gives him a clue to the treasure. The Old Sage: "The wilderness is unforgiving. Learn to read the signs, and you'll find your way.`;
            typeText(sceneText, () => {
                content.innerHTML += `
                    <div class="button-container">
                        <button onclick="listenToTheOldMan()">Listen</button>
                        <button onclick="showScene('story')">Continue</button>
                    </div>
                `;
            });
            break;


        case "ignore":
            sceneText = `The character ignores the whisper and on his way he finds a mysterious message on a wall, giving him a clue about the journey ahead.`;
            typeText(sceneText, () => {
                content.innerHTML += `
                    <div class="button-container">
                        <button onclick="exploreText()">Read The Scripture</button>
                        <button onclick="showScene('story')">Continue</button>
                    </div>
                `;
            });
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

            /* when the text is finished, call the callback function to manipulate the DOM */
            if (callback) callback();
        }
    }

    type();
}


function showWhisperOptions() {
    const options = document.getElementById("options");
    options.innerHTML = `
        <p class="whisperText fade-in">...A strange whisper is heard...</p>
        <button onclick="selectPath('explore')" class="fade-in">EXPLORE</button>
        <button onclick="selectPath('ignore')" class="fade-in">IGNORE</button>    
    `;

    const buttons = document.querySelectorAll('.fade-in');
    buttons.forEach((button, index) => {
        setTimeout(() => {
            button.classList.add("show");
        }, 200 * (index + 1)); /* a short delay for each button */
    });
}

function selectPath(choice) {
    let confirmation;

    if (choice === "explore") {
        confirmation = confirm("Are you sure you want to explore the whisper?");
    } else if (choice === "ignore") {
        confirmation = confirm("Are you sure you want to ignore the whisper?");
    }

    if (confirmation) {
        showPopupMessage("Path chosen");

        /* Manage the choice and change the scene based on it */
        switch (choice) {
            case "explore":
                showScene("explore");
                break;
            case "ignore":
                showScene("ignore");
                break;
        }

    } else {
        showPopupMessage("Action canceled");

    }
}



function changeBackground(scene) {
    const body = document.body;

    /* Define the background images for each scene */

    switch (scene) {
        case "story":
            body.style.backgroundImage = "url('media/youngMan.webp')";
            break;
        case "explore":
            body.style.backgroundImage = "url('media/oldSage.png')";
            break;
        case "ignore":
            body.style.backgroundImage = "url('media/examine.webp')";
            break;
        default:
            body.style.backgroundImage = "url('images_audio/cave.webp')";
            break;

    }

    /* Add smooth transition on background change */
    body.style.transition = "background-image 1s ease-in-out";

}

function showPopupMessage(message) {
    const popup = document.getElementById("popupMessage");
    popup.innerText = message;
    popup.style.display = "block";

    /* Popup-animation */
    setTimeout(() => {
        popup.style.opacity = "1";
        popup.style.transform = "translateY(-50%, -50%) scale(1)";
    }, 10);

    /* Hide the popup after 3 seconds */
    setTimeout(() => {
        popup.style.opacity = "0";
        popup.style.transform = "translateY(-50%, -50%) scale(0.9)";
        setTimeout(() => {
            popup.style.display = "none";
        }, 500);
    }, 3000);
}


const audio = new Audio('media/wiseManSaid.mp3');
let isPlaying = false;

function listenToTheOldMan() {
    isPlaying ? audio.pause() : audio.play();

    audio.onplaying = function () {
        isPlaying = true;
    }

    audio.onpause = function () {
        isPlaying = false;
    }
}



function exploreText() {
    const content = document.getElementById("content");
    const options = document.getElementById("options");

    content.innerHTML = `
        <p>When the shadows dance on the wall like dead butterflies, and the stars form a cross in the north,
            seek beneath the roots of the lonely tree.]</p>
    `;

    options.innerHTML = `
        <button onclick="showScene('ignore')">Back</button>
    `;
}

