import { characters } from "./characters.js";


// ====================
// DOM
// ====================

const charactersContainer =
    document.getElementById("characters");


// ====================
// 建立角色
// ====================

function createCharacter(characterData) {

    const characterId = characterData.id;
    const character = characters[characterId];

    if (!character) {
        return;
    }

    const image = document.createElement("img");


    // ====================
    // 立繪差分
    // ====================

    if (characterData.expression) {

        const expression =
            character.images[characterData.expression];

        if (expression) {

            image.src =
                `assets/characters/${expression}`;

        } else {

            image.src =
                `assets/characters/${character.images.normal}`;

        }

    } else {

        image.src =
            `assets/characters/${character.images.normal}`;

    }


    // ====================
    // 基本設定
    // ====================

    image.classList.add("character");

    image.dataset.character = characterId;

    image.dataset.expression =
        characterData.expression || "normal";


    // ====================
    // 位置 / 大小
    // ====================

    image.style.left =
        characterData.left || "50%";

    image.style.bottom =
        characterData.bottom || "0%";

    image.style.height =
        characterData.height || "100%";


    // ====================
    // 移動速度
    // ====================

    image.style.setProperty(
        "--move-speed",
        characterData.speed || "0.8s"
    );


    // ====================
    // 前後層級
    // ====================

    image.style.zIndex =
        characterData.zIndex ?? 1;


    charactersContainer.appendChild(image);
}


// ====================
// 顯示 / 更新角色
// ====================

function showCharacter(characterData) {

    const characterId =
        characterData.id;

    const oldImage =
        charactersContainer.querySelector(
            `.character[data-character="${characterId}"]`
        );


    // ====================
    // 同一個角色已經存在
    // ====================

    if (oldImage) {

        const oldExpression =
            oldImage.dataset.expression;

        const newExpression =
            characterData.expression || "normal";


        // --------------------
        // 差分沒有改變
        // --------------------

        if (oldExpression === newExpression) {

            oldImage.style.left =
                characterData.left || oldImage.style.left;

            oldImage.style.bottom =
                characterData.bottom || oldImage.style.bottom;

            oldImage.style.height =
                characterData.height || oldImage.style.height;

            oldImage.style.setProperty(
                "--move-speed",
                characterData.speed || "0.8s"
            );

            oldImage.style.zIndex =
                characterData.zIndex ?? oldImage.style.zIndex;

            return;
        }


        // --------------------
        // 差分改變
        // --------------------

        const character =
            characters[characterId];

        let newImageSrc;


        if (
            character.images[newExpression]
        ) {

            newImageSrc =
                `assets/characters/${character.images[newExpression]}`;

        } else {

            newImageSrc =
                `assets/characters/${character.images.normal}`;

        }


        oldImage.src = newImageSrc;

        oldImage.dataset.expression =
            newExpression;


        // 更新位置
        oldImage.style.left =
            characterData.left || oldImage.style.left;

        oldImage.style.bottom =
            characterData.bottom || oldImage.style.bottom;

        oldImage.style.height =
            characterData.height || oldImage.style.height;


        // 更新速度
        oldImage.style.setProperty(
            "--move-speed",
            characterData.speed || "0.8s"
        );


        // 更新前後層級
        oldImage.style.zIndex =
            characterData.zIndex ?? oldImage.style.zIndex;

        return;
    }


    // ====================
    // 新角色
    // ====================

    createCharacter(characterData);
}


// ====================
// 角色退場
// ====================

function hideCharacter(characterId = null) {

    const images =
        charactersContainer.querySelectorAll(
            ".character"
        );


    images.forEach(function(image) {

        // 如果指定角色，只讓指定角色退場
        if (
            characterId &&
            image.dataset.character !== characterId
        ) {
            return;
        }


        image.classList.add(
            "character-fade-out"
        );


        image.addEventListener(
            "animationend",
            function() {

                image.remove();

            },
            { once: true }
        );

    });
}


// ====================
// 同步場景角色
// ====================

function syncCharacters(characterList) {

    const currentImages =
        charactersContainer.querySelectorAll(
            ".character"
        );


    // ====================
    // 沒有角色
    // ====================

    if (
        !characterList ||
        characterList.length === 0
    ) {

        hideCharacter();

        return;
    }


    // ====================
    // 目前場景有哪些角色
    // ====================

    const activeIds =
        characterList.map(function(characterData) {

            return characterData.id;

        });


    // ====================
    // 讓不在場上的角色退場
    // ====================

    currentImages.forEach(function(image) {

        const characterId =
            image.dataset.character;

        if (
            !activeIds.includes(characterId)
        ) {

            image.classList.add(
                "character-fade-out"
            );

            image.addEventListener(
                "animationend",
                function() {

                    image.remove();

                },
                { once: true }
            );
        }

    });


    // ====================
    // 顯示 / 更新角色
    // ====================

    characterList.forEach(function(characterData) {

        showCharacter(characterData);

    });
}


// ====================
// 對外提供
// ====================

export {
    showCharacter,
    hideCharacter,
    syncCharacters
};