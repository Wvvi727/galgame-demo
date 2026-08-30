// ====================
// 文字系統
// ====================

let isTyping = false;
let typingTimer = null;
let currentText = "";


// 逐字播放

export function typeText(text, storyText) {

    clearTimeout(typingTimer);

    currentText = text;
    storyText.textContent = "";

    isTyping = true;

    let index = 0;

    function typeNextCharacter() {

        if (index >= text.length) {

            isTyping = false;
            return;
        }

        const character = text[index];

        storyText.textContent += character;

        index++;

        let delay = 50;

        if (character === "，" || character === "、") {

            delay = 200;

        } else if (
            character === "。" ||
            character === "！" ||
            character === "？"
        ) {

            delay = 300;

        } else if (
            character === "…" ||
            character === "⋯"
        ) {

            delay = 400;

        } else if (character === "\n") {

            delay = 200;
        }

        typingTimer = setTimeout(typeNextCharacter, delay);
    }

    typeNextCharacter();
}


// 跳過逐字動畫

export function skipTyping(storyText) {

    if (!isTyping) {
        return false;
    }

    clearTimeout(typingTimer);

    storyText.textContent = currentText;

    isTyping = false;

    return true;
}


// 判斷文字是否正在播放

export function getIsTyping() {

    return isTyping;
}


// 停止文字播放

export function stopTyping() {

    clearTimeout(typingTimer);

    isTyping = false;
}