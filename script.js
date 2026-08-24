const characters = {
    encore: {
        name: "Encore",
        affection: 20,
        san: 60
    }
};

const player = {
    character: null,
    affection: 0,
    san: 0
};

const story = {
    start: {
        type: "text",
        text: "睜開眼睛，映入視野的是一片平常的光景。",
        next: "restaurant"
    },

    restaurant: {
        type: "text",
        text: "溫暖而明亮的燈光下，你坐在深胡桃木色的桌前。\n空氣中飄散著一股烘烤的芬芳——是咖啡豆的氣味。",
        next: "doubt"
    },

    doubt: {
        type: "text",
        text: "這裡是咖啡廳嗎？可你前一刻不是還在......\n\n還在......\n\n還在......什麼？想不起來了。\n和這裡使人忍不住放鬆的氣氛一比，前一刻在做甚麼似乎也顯得沒那麼重要了。",
        next: "observe"
    },

    observe: {
        type: "text",
        text: "環顧四週，這裡還挺熱鬧的，可以說是座無虛席。\n\n店員從你身邊匆匆走過，似乎並沒有注意到你。",
        next: "choice"
    },

    choice: {
        type: "choice",
        text: "你決定主動向店員搭話。要招呼誰過來呢？",

        choices: [
            {
                text: "在客桌間靈活穿梭、老鼠耳朵的淺藍髮店員。",
                next: "encore_start",
                character: "encore",
            },

            {
                text: "暫時還沒有。",
                next: "ignore"
            }
        ]
    },

    encore_start: {
        type: "text",
        text: "你走過去向她打了聲招呼。",
        next: "encore_01"
    },

    encore_01: {
        type: "choice",
        text: "她停下手邊的工作，轉過身來看著你。\n\n「你好呀。」",
        choices: [
            {
                text: "很隨便的回應她的打招呼。",
                next: "encore_end_01",
                 effects: {
                    affection: 3,
                    san: -5
                }
            },
            {
                text: "假裝沒有看見她。",
                next: "ignore"
            }
        ]
    },

    ignore: {
        type: "text",
        text: "你假裝沒有看見她，默默走到了自己的座位。",
        next: "end"
    },

    encore_end_01: {
        type: "text",
        text: "她微笑着向你打招呼，你感到一絲溫暖。\n\n「今天天氣不錯呢。」",
        next: "end"
    },

    end: {
        type: "text",
        text: "這一段劇情結束了。",
        next: null
    }
};

const storyText = document.getElementById("story-text");
const status = document.getElementById("status");
const affectionValue = document.getElementById("affection-value");
const sanValue = document.getElementById("san-value");

function updateStatus() {

    if (player.character === null) {

        status.style.display = "none";

        return;
    }

    status.style.display = "block";

    affectionValue.textContent = player.affection;
    sanValue.textContent = player.san;
}

const nextButton = document.getElementById("next-button");
const restartButton = document.getElementById("restart-button");
const choicesContainer = document.getElementById("choices");

let currentNode = "start";

function showNode(nodeName) {

    const node = story[nodeName];

    storyText.textContent = node.text;

    // 如果進入這個劇情節點會改變數值
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

    if (node.type === "text") {

        if (node.next === null) {
        nextButton.style.display = "none";
        restartButton.style.display = "block";
        } else {
        nextButton.style.display = "block";
        restartButton.style.display = "none";
        }

    }

    if (node.type === "choice") {

        nextButton.style.display = "none";
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

                // 更新右上角數值
                updateStatus();
                
                // 前往下一個劇情節點
                currentNode = choice.next;
                showNode(currentNode);

            });

            choicesContainer.appendChild(button);

        });

    }
}

updateStatus();
showNode(currentNode);

nextButton.addEventListener("click", function() {

    const node = story[currentNode];

    if (node.next !== null) {
        currentNode = node.next;
        showNode(currentNode);
    }

});

restartButton.addEventListener("click", function() {

    currentNode = "start";

    player.character = null;
    player.affection = 0;
    player.san = 0;

    updateStatus();

    showNode(currentNode);

});