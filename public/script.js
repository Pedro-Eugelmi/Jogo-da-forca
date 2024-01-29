"use strict";
let category;
let word;
let misses = 0;
let buttons = document.querySelectorAll(".rows div");
let screenWord = [];
let isPlaying = false;
let Modal = document.getElementById("Modal");
//Quando clicar em qualquer botão
buttons.forEach((item) => {
    item.addEventListener("click", () => {
        if (isPlaying == true) {
            if (item.textContent) {
                verifyLetter(item.textContent.toLowerCase(), item);
            }
        }
    });
});
function startGame() {
    //gerando categoria e palavra
    category = generateCategory();
    word = generateWord(category);
    let HTMLWord = document.querySelector(".guess-area span");
    let HTMLCategory = document.querySelector(".forca h1");
    //mostrando a categoria no HTML
    if (HTMLCategory) {
        HTMLCategory.textContent = category;
    }
    //Criando os espaços -- 
    if (HTMLWord) {
        HTMLWord.textContent = "";
        word.split("").map(() => {
            if (HTMLWord) {
                screenWord.push("- ");
            }
        });
        HTMLWord.textContent = screenWord.join("");
    }
    isPlaying = true;
}
//gerar a categoria
function generateCategory() {
    let categories = Object.keys(words);
    let category = categories[Math.floor(Math.random() * categories.length)];
    return category;
}
//gerar a palavra de acordo com a categoria
function generateWord(category) {
    let array = words[category];
    let word = array[Math.floor(Math.random() * array.length)];
    return word;
}
//verificar a letra
function verifyLetter(key, item) {
    let wordArray = word.split("");
    let letterPos = [];
    let forcaImg = document.querySelector(".forca-img img");
    let HTMLWord = document.querySelector(".guess-area span");
    //Verifica se a tecla já foi pressioanda
    if (!item.classList.contains("right") && !item.classList.contains("wrong")) {
        // verifica se tem essa letra na palavra
        wordArray.map((item, index) => {
            if (item == key) {
                letterPos.push(index);
            }
        });
        //Se tiver acertado
        if (letterPos.length > 0) {
            item.classList.add("right");
            //atualizar a palavra que aparece no HTML
            let auxCont = 0;
            for (let cont = 0; cont <= screenWord.length; cont++) {
                if (cont == letterPos[auxCont]) {
                    screenWord[cont] = key;
                    auxCont++;
                }
            }
            //escrevendo a palavra do HTML
            if (HTMLWord) {
                HTMLWord.textContent = screenWord.join("");
            }
            // Verificando se a palavra foi completa
            if (screenWord.join("") == word) {
                isPlaying = false;
                openModal("img/winner.png", "Parabéns, você ganhou!");
            }
        }
        else {
            misses++;
            item.classList.add("wrong");
            //atualiza a imagem da forca 
            forcaImg.src = `img/img${misses}.png`;
            // se errou mais de 6 vezes
            if (misses >= 6) {
                isPlaying = false;
                openModal("img/loser.webp", "Você consegue fazer melhor...");
            }
        }
    }
}
startGame();
//Abrir o Modal
function openModal(src, text) {
    let img = Modal.querySelector(".content img");
    let h1 = Modal.querySelector(".content h1");
    let span = Modal.querySelector(".content span");
    img.src = src;
    if (h1 && span) {
        h1.textContent = text;
        span.textContent = `A palavra é ${word}`;
    }
    Modal.showModal();
}
//fechar modal
function closeModal() {
    Modal.close();
}
//recarregar a página
function reloadPage() {
    location.reload();
}
