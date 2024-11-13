window.addEventListener("DOMContentLoaded", main);


function main() {
    // loadStateFromLs();
    // startGame();
    
}

function startGame() {
    
    document.getElementById("title").style.display = "none";
    document.getElementById("startScreen").style.display = "none";
    
    /* Show the game interface */
    document.getElementById("sceneContainer").style.display = "flex";
    
    showInventoryButton();
    document.getElementById("inventoryButton").style.display = "block";
    
    addToInventory("map", "torch", "rope");
    


    /* Change the background for the first scene */
    changeBackground('story');

    /*Define the text for the first scene */
    const storyText = `A young man wakes up in a dark cave, alone and disoriented. The only thing he remembers is a mysterious map hidden in his pocket, showing the way to a legendary treasure, the lost ark.`;

    /* Start the typing for the first scene */
    typeText(storyText, () => {
        setTimeout(() => eventTextAndButtons('explore'), 500);
    });
}


function showScene(scene) {
    const narration = document.getElementById("narration");
    const events = document.getElementById("events");
    const options = document.getElementById("options");

    narration.innerHTML = ""; /* Clear previous narration */
    events.innerHTML = ""; /* Clear previous buttons */
    options.innerHTML = ""; /* Clear previous buttons */

    changeBackground(scene);

    /* Define the text  based on the scene */
    let sceneText = "";

    switch (scene) {
        case "narration1":
            sceneText = `A young man wakes up in a dark cave, alone and disoriented. The only thing he remembers is a mysterious map hidden in his pocket, showing the way to a legendary treasure, the lost ark.`;
            typeText(sceneText, () => {
                setTimeout(() => eventTextAndButtons('explore'), 500);
            });
            break;


        case "explore":
            sceneText = `Following the whisper, he discovers an old sage who gives him a clue to the treasure. 
            The Old Sage: "The wilderness is unforgiving. Learn to read the signs, and you'll find your way.`;
            typeText(sceneText, () => {
                options.innerHTML += `
                    <div class="button-container">
                        <button onclick="listenToTheOldMan()" class="fade-in">Ask For Advice</button>
                        <button onclick="showScene('narrationAfterExplore')" class="fade-in">Continue Journey</button>
                    </div>
                `;
                setTimeout(fadeInContent, 100);

            });
            break;

        case "narrationAfterExplore":
            sceneText = `A chill crept down his spine as the old man's words echoed. 
                        Curiosity and dread warred within him. Drawn by the promise of treasure, he ventured deeper into the ominous darkness.`;
            typeText(sceneText, () => {
                setTimeout(() => eventTextAndButtons('crossroads'), 500);
            });

            break;

        case "ignore":
            sceneText = `While the faint whisper still echoes in the air, the character feels a chilly wind sweep through the cave. 
            Something makes you hesitate the feeling of following the whisper feels dangerous, and maybe even unnecessary.
            He decides to ignore the sound and continue forward and finds a mysterious message on a wall.
            `;

            typeText(sceneText, () => {
                narration.innerHTML += `
                    <div class="button-container">
                        <button onclick="readInscription()" class="fade-in">Read The Scripture</button>
                        <button onclick="showScene('nextScene')" class="fade-in">Continue Journey</button>
                    </div>
                `;
                setTimeout(fadeInContent, 100);
            });
            break;

        case "nextScene":
            sceneText = `The player, unable to decipher the cryptic message, continues their journey. 
            The air grows colder, the shadows longer. As the path twists and turns, uncertainty creeps in. 
            `;

            typeText(sceneText, () => {
                narration.innerHTML += `
                    <div class="button-container">
                        <button onclick="showScene('criticalMoment')" class="fade-in">Keep Moving Forward</button>
                    </div>
                `;
                setTimeout(fadeInContent, 100);
            });
            break;

        case "criticalMoment":
            sceneText = `As the player ventures deeper, a chilling presence fills the air. 
            The darkness feels alive, as if something unseen trails behind. 
            They reach a spot where the walls are clawed with strange marks and unsettling 
            tracks—signs of recent visitors...or perhaps something far more menacing.
            `;

            typeText(sceneText, () => {
                setTimeout(() => eventTextAndButtons('now_or_never'), 500);
            });
            break;

        case "escapeEnding":
            showEndScreen(
                "Congratulations!",
                "You have succesfully escaped the cave!",
                "media/escapeScene.webp"
            );
            break;
            
    }
}


function eventTextAndButtons(scene) {
    const events = document.getElementById("events");
    const options = document.getElementById("options");

    events.innerHTML = "";
    options.innerHTML = "";

    let eventText = "";

    events.innerHTML = `
            <p class="eventTextStyle fade-in">...A strange whisper is heard...</p>`;

    switch (scene) {
        case 'explore':
            eventText = "...A strange whisper is heard...";
            options.innerHTML = `
                <button onclick="selectPath('explore')" class="fade-in">EXPLORE</button>
                <button onclick="selectPath('ignore')" class="fade-in">IGNORE</button>   
            `;
            break;

        case 'crossroads':
            eventText = "...Squeeze through or crush your toes? That is the question....";
            options.innerHTML = `
                <button onclick="selectPath('narrowPassage')" class="fade-in">The Narrow Passage</button>
                <button onclick="selectPath('rockyRoad')" class="fade-in">The Rocky Road</button>
            `;
            break;

        case "now_or_never":
            eventText = 'The red eyes glowed in the darkness, freezing the young man in horror. His heart pounded so fiercely, it felt ready to burst."';
            options.innerHTML = `
                <button onclick="selectPath('leaveCave')" class="fade-in">Leave The Cave</button>
            `;
            break;

        default:
            eventText = "";
    }

    events.innerHTML = `<p class="eventTextStyle fade-in">${eventText}</p>`;

    fadeInContent();
}

function fadeInContent() {
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
    } else if (choice === "narrowPassage") {
        confirmation = confirm("Sure with your choice?");
    } else if (choice === "rockyRoad") {
        confirmation = confirm("You're about to choose The Rocky Road")
    } else if (choice === "leaveCave") {
        confirmation = confirm("You're about to leave the cave");
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
            case "narrowPassage":
                showScene("narrowPassage");
                break;
            case "rockyRoad":
                showScene("rockyRoad");
                break;
            case "leaveCave":
                showScene("escapeEnding");
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
        case "narrationAfterExplore":
            body.style.backgroundImage = "url('media/into_depper.webp')";
            break;
        case "nextScene":
            body.style.backgroundImage = "url('media/nextScene.webp')";
            break;
        case "criticalMoment":
            body.style.backgroundImage = "url('media/leave_cave.webp')";
            break;
        default:
            body.style.backgroundImage = "";
            break;

    }

    /* Add smooth transition on background change */
    body.style.transition = "background-image 1s ease-in-out";

}

function typeText(text, callback) {
    const narrationText = document.getElementById("narration");
    narrationText.textContent = "";
    narrationText.style.display = "block"; /* Show the story text */

    let letterIndex = 0;
    const typingSpeed = 10;

    // TODO : Add typing sound
    const typingSound = new Audio("media/typingSound.mp3");
    typingSound.loop = true;

    typingSound.play();

    function type() {
        if (letterIndex < text.length) {
            narrationText.textContent += text[letterIndex];
            letterIndex++;
            setTimeout(type, typingSpeed);
        } else {

            // TODO : Add typing sound
            typingSound.pause();
            typingSound.currentTime = 0;

            /* when the text is finished, call the callback function to manipulate the DOM */
            if (callback) callback();
        }
    }

    type();
}

function showPopupMessage(message) {
    const popup = document.getElementById("popupMessage");
    popup.innerText = message;
    popup.style.display = "block";

    /* Popup-animation */
    setTimeout(() => {
        popup.style.opacity = "1";
        popup.style.transform = "translate(-50%, -50%) scale(1)";
    }, 10);

    /* Hide the popup after 3 seconds */
    setTimeout(() => {
        popup.style.opacity = "0";
        popup.style.transform = "translate(-50%, -50%) scale(0.9)";
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



function readInscription() {
    const narration = document.getElementById("narration");
    const options = document.getElementById("options");

    narration.innerHTML = `
        <p>[As dark shadows move on the stone's surface, and echoes of lost voices fill the air, look for the stone that doesn't belong. There, deep in the heart of the cave, you will find the key to what is hidden]</p>
    `;

    options.innerHTML = `
        <button onclick="showScene('ignore')">Back</button>
    `;
}


// ! NEW FUNCTIONS START
function showEndScreen(title, message, backgroundUrl) {
    document.getElementById("endTitle").innerText = title;
    document.getElementById("endMessage").innerText = message;

    const endScreen = document.getElementById("endScreen");
    if(backgroundUrl) {
        endScreen.style.backgroundImage = `url('${backgroundUrl}')`;
    }

    document.getElementById("sceneContainer").style.display = "none";
    endScreen.style.display ="flex";

    document.getElementById("inventoryButton").style.display = "none";

}

function restartGame() {
    document.getElementById("endScreen").style.display = "none";

    document.getElementById("title").style.display = "block";
    document.getElementById("startScreen").style.display = "block";

// ! MAKE THE INVENTORY BUTTON VISIBLE AGAIN ONCE THE PLAYER IS CLICKED ON THE START GAME BUTTON NOT ON WELCOME SCREEN
    document.getElementById("inventoryButton").style.display = "none";

    localStorage.clear();

}

// ! NEW FUNCTIONS END

function addToInventory(...items) {
    let inventory = JSON.parse(localStorage.getItem('inventory')) || [];

    items.forEach(item => {
        if (!inventory.includes(item)) {
            inventory.push(item);
        }
    });

    localStorage.setItem('inventory', JSON.stringify(inventory));
    items.forEach(item => {
        showPopupMessage(`${item} added to inventory!`);
    });
}


function getInventory() {
    return JSON.parse(localStorage.getItem('inventory')) || [];
}

function removeFromInventory(item) {
    let inventory = JSON.parse(localStorage.getItem('inventory')) || [];
    inventory = inventory.filter(i => i !== item);
    localStorage.setItem('inventory', JSON.stringify(inventory));
}

function showInventory() {
    const inventory = getInventory();
    alert(`inventory: ${inventory.length ? inventory.join(', ') : 'Empty'}`);
}

function pickUpItem(item) {
    addToInventory(item);
    showInventory();
}


function showInventoryButton() {

    if (!document.getElementById("inventoryButton")) {
        const inventoryButton = document.createElement("button");
        inventoryButton.id = "inventoryButton";
        inventoryButton.innerText = "Inventory";
        inventoryButton.onclick = showInventory;

        /* Place the button somewhere */
        document.body.appendChild(inventoryButton);

    }
}