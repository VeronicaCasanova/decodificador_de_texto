// Função para validar o input
function validarInput(input) {
    return input.value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

// Elementos do DOM
let textInput = document.querySelector("#input_texto");
let outputDiv = document.querySelector("#output_text");  // Alterado para "#output_text"
let imageContainer = document.querySelector(".image-container");
let imageContainer2 = document.querySelector(".image-container2");

// Mapeamento para criptografar e descriptografar
const cryptoMap = {
    'e': 'enter',
    'i': 'imes',
    'a': 'ai',
    'o': 'ober',
    'u': 'ufat'
};

const decryptMap = {
    'enter': 'e',
    'imes': 'i',
    'ai': 'a',
    'ober': 'o',
    'ufat': 'u'
};

// Função para criptografar o texto
function criptografar() {
    var texto = validarInput(textInput);
    var resultCripto = replaceUsingMap(texto, cryptoMap);
    updateOutput(resultCripto);
    clearImages();
}

// Função para descriptografar o texto
function descriptografar() {
    var texto = validarInput(textInput);
    var resultDescripto = replaceUsingMap(texto, decryptMap);
    updateOutput(resultDescripto);
    clearImages();
}

// Função auxiliar para substituir texto usando um mapeamento
function replaceUsingMap(text, map) {
    for (let key in map) {
        text = text.replace(new RegExp(key, 'g'), map[key]);
    }
    return text;
}

// Função para copiar o texto
function copiar() {
    if (outputDiv.textContent.trim() !== '') {  // Verifica se o texto no output não está vazio
        navigator.clipboard.writeText(outputDiv.textContent);  // Copia o texto do output para a área de transferência
        alert("Texto copiado!");
    }
}

// Função para limpar os campos
function limpar() {
    textInput.value = '';
    outputDiv.textContent = '';  // Reseta o texto do output
    restoreImage();
}

// Função para atualizar a saída
function updateOutput(text) {
    outputDiv.textContent = text;
}

// Função para limpar imagens
function clearImages() {
    imageContainer.innerHTML = '';  // Remove as imagens da div
    imageContainer2.innerHTML = '';  // Remove as imagens da div
}

// Função para restaurar a imagem
function restoreImage() {
    var body = document.body;
    var imagePath = body.classList.contains("dark-mode") ? "assets/Cheshire_dark.png" : "assets/Cheshire_animado.gif";
    imageContainer.innerHTML = '<img id="image" src="' + imagePath + '" alt="cheshire">';  // Restaura a imagem na div
    var imagePath2 = body.classList.contains("dark-mode") ? "assets/decodificador_dark.png" : "assets/decodificador.png";
    imageContainer2.innerHTML = '<img id="image2" src="' + imagePath2 + '" alt="decodificador">';  // Restaura a imagem na div
}

// Função para alternar o modo escuro
function toggleDarkMode() {
    var body = document.body;
    var image = document.getElementById("image");
    var image2 = document.getElementById("image2");
    var switchElement = document.querySelector(".switch input");

    if (switchElement.checked) {
        body.classList.add("dark-mode");
        image.src = "assets/Cheshire_dark.png";
        image2.src = "assets/decodificador_dark.png";
    } else {
        body.classList.remove("dark-mode");
        image.src = "assets/Cheshire_animado.gif";
        image2.src = "assets/decodificador.png";
    }
    restoreImage();  // Restaura a imagem ao alternar o modo
}

