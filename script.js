const storyText = document.getElementById("story-text");
const nextButton = document.getElementById("next-button");

const story = [
    "睜開眼睛，映入視野的是一片平常的光景。",
    "溫暖而明亮的燈光下，你坐在深胡桃木色的桌前。\n空氣中飄散著一股烘烤的芬芳——是咖啡豆的氣味。",
    "這裡是咖啡廳嗎？可你前一刻不是還在......",
    "還在......",
    "還在......什麼？想不起來了。\n和這裡使人忍不住放鬆的氣氛一比，前一刻在做甚麼似乎也顯得沒那麼重要了。",
    "環顧四週，這裡還挺熱鬧的，可以說是座無虛席。\n店員從你身邊匆匆走過，似乎並沒有注意到你。",
    "你決定主動向店員搭話。",
    "要招呼誰過來呢？"
];

let currentText = 0;

// 一開始就顯示第一句
storyText.textContent = story[currentText];

nextButton.addEventListener("click", function() {

    if (currentText < story.length - 1) {
        currentText++;
        storyText.textContent = story[currentText];
    }

});