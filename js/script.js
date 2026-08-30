// ====================
// 資料
// ====================

import { characters } from "./characters.js";
import { story } from "./story.js";

import {
    typeText,
    skipTyping,
    getIsTyping,
    stopTyping
} from "./text.js";

import {
    syncCharacters
} from "./characterSystem.js";

const player = {
    character: null,
    affection: 0,
    san: 0
};


// ====================
// DOM 元素
// ====================

const storyText = document.getElementById("story-text");
const speakerName = document.getElementById("speaker-name");

const status = document.getElementById("status");

const affectionValue = document.getElementById("affection-value");
const sanValue = document.getElementById("san-value");

const charactersContainer = document.getElementById("characters");

const restartButton = document.getElementById("restart-button");
const choicesContainer = document.getElementById("choices");

const settingsButton = document.getElementById("settings-button");
const backButton = document.getElementById("back-button");

const titleScreen = document.getElementById("title-screen");
const settingsScreen = document.getElementById("settings-screen");

const startButton = document.getElementById("start-button");
const gameScreen = document.getElementById("game");
const prologueScreen = document.getElementById("prologue-screen");


function showSpeaker(characterId) {

    if (!characterId) {

        speakerName.style.display = "none";
        speakerName.textContent = "";

        return;
    }

    const character = characters[characterId];

    if (!character) {

        speakerName.style.display = "none";
        speakerName.textContent = "";

        return;
    }

    speakerName.textContent = character.name;
    speakerName.style.display = "block";
}

function updateCharacterBrightness(speakerId) {

    const images =
        charactersContainer.querySelectorAll(".character");

    images.forEach(function(image) {

        // 沒有說話者 → 所有人恢復正常亮度
        if (!speakerId) {

            image.classList.remove("dimmed");

            return;
        }

        // 正在說話的角色保持正常亮度
        if (image.dataset.character === speakerId) {

            image.classList.remove("dimmed");

        } else {

            // 其他角色變暗
            image.classList.add("dimmed");

        }

    });
}


// ====================
// 數值系統
// ====================

function updateStatus() {

    if (player.character === null) {

        status.style.display = "none";

        return;
    }

    status.style.display = "block";

    affectionValue.textContent = player.affection;
    sanValue.textContent = player.san;
}


// ====================
// 劇情系統
// ====================

let currentNode = "start";
let currentTextIndex = 0;

function showNode(nodeName) {

    const node = story[nodeName];

    stopTyping();
    
    if (node.texts) {
        typeText(node.texts[currentTextIndex], storyText);
    }

    // ====================
    // 同步場景中的角色
    // ====================

    if (node.character) {

        const characterList = Array.isArray(node.character)
            ? node.character
            : [node.character];

        syncCharacters(characterList);

    } else {

        syncCharacters([]);

    }

    // 說話的
    if (node.speaker) {

        showSpeaker(node.speaker);

    } else {
        
        showSpeaker(null);
    
    }

    // 更新角色明暗
    updateCharacterBrightness(node.speaker);

    // 如果進入這段劇情節點會改變數值
    if (node.effects) {

        if (node.effects.affection !== undefined) {
            player.affection += node.effects.affection;
        }

        if (node.effects.san !== undefined) {
            player.san += node.effects.san;
        }

        updateStatus();
    }

    choicesContainer.innerHTML = "";

    // 普通劇情
    if (node.type === "text") {

        gameScreen.classList.remove("choice-active");

        if (node.next === null) {
            restartButton.style.display = "block";
        } else {
            restartButton.style.display = "none";
        }

    }

    // 選項
    if (node.type === "choice") {

        gameScreen.classList.add("choice-active");

        restartButton.style.display = "none";

        node.choices.forEach(function(choice) {

            const button = document.createElement("button");

            button.textContent = choice.text;

            button.addEventListener("click", function() {

                // 如果這個選項有指定攻略對象
                if (choice.character) {

                    player.character = choice.character;

                    const character = characters[choice.character];

                    player.affection = character.affection;
                    player.san = character.san;

                }

                // 如果這個選項會改變數值
                if (choice.effects) {

                    if (choice.effects.affection !== undefined) {
                        player.affection += choice.effects.affection;
                    }

                    if (choice.effects.san !== undefined) {
                        player.san += choice.effects.san;
                    }
                }

                // 更新數值
                updateStatus();

                // 前往下一段劇情節點
                currentNode = choice.next;
                currentTextIndex = 0;

                showNode(currentNode);

            });

            choicesContainer.appendChild(button);

        });

    }
}


// ====================
// 點擊推進
// ====================

gameScreen.addEventListener("click", function(event) {

    // 如果點擊的是選項按鈕，不處理這次點擊
    if (event.target.closest("#choices button")) {
        return;
    }

    const node = story[currentNode];

    if (node.type !== "text") {
        return;
    }

    // 如果文字還在播放
    if (getIsTyping()) {
        
        skipTyping(storyText);
        
        return;
    }

    // 如果還有下一句
    if (currentTextIndex < node.texts.length - 1) {

        currentTextIndex++;

        showNode(currentNode);

        return;
    }

    // 如果這個節點已經沒有下一句
    if (node.next !== null) {

        currentNode = node.next;

        currentTextIndex = 0;

        showNode(currentNode);
    }

});


// ====================
// Restart
// ====================

restartButton.addEventListener("click", function() {

    stopTyping();

    currentNode = "start";
    currentTextIndex = 0;

    player.character = null;
    player.affection = 0;
    player.san = 0;

    updateStatus();

    showNode(currentNode);

});


// ====================
// 主選單：Options
// ====================

settingsButton.addEventListener("click", function() {

    document.getElementById("title").style.display = "none";
    document.getElementById("main-menu").style.display = "none";

    settingsScreen.style.display = "block";

});

backButton.addEventListener("click", function() {

    settingsScreen.style.display = "none";

    document.getElementById("title").style.display = "block";
    document.getElementById("main-menu").style.display = "flex";

});


// ====================
// 主選單：開始遊戲
// ====================

startButton.addEventListener("click", function() {

    // 隱藏首頁
    titleScreen.style.display = "none";

    // 顯示遊戲本體
    gameScreen.style.display = "block";

    currentNode = "start";
    currentTextIndex = 0;

    // 先不要播放劇情
    prologueScreen.style.display = "flex";

    setTimeout(function() {

        // 移除轉場
        prologueScreen.style.display = "none";

        // 轉場結束後才開始第一句
        showNode(currentNode);

    }, 1500);

});


// ====================
// 初始化
// ====================

updateStatus();
showNode(currentNode);