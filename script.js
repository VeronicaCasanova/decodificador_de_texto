// Função para validar o input
function validarInput(input) {
    return input.value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

// Elementos do DOM
let textInput = document.querySelector("#input_texto");
let outputDiv = document.querySelector("#output_text");  // Alterado para "#output_text"
let imageContainer = document.querySelector(".image-container");

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
    navigator.clipboard.writeText(outputDiv.textContent);  // Copia o texto do output para a área de transferência
    alert("Texto copiado!");
}

// Função para limpar os campos
function limpar() {
    textInput.value = '';
    outputDiv.textContent = 'Sua mensagem aparecerá aqui!';  // Reseta o texto do output
    restoreImage();
}

// Função para atualizar a saída
function updateOutput(text) {
    outputDiv.textContent = text;
}

// Função para limpar imagens
function clearImages() {
    imageContainer.innerHTML = '';  // Remove as imagens da div
}

// Função para restaurar a imagem
function restoreImage() {
    var body = document.body;
    var imagePath = body.classList.contains("dark-mode") ? "assets/che.png" : "assets/Cheshire_animado.gif";
    imageContainer.innerHTML = '<img id="image" src="' + imagePath + '" alt="cheshire">';  // Restaura a imagem na div
}

// Função para alternar o modo escuro
function toggleDarkMode() {
    var body = document.body;
    var image = document.getElementById("image");
    var switchElement = document.querySelector(".switch input");

    if (switchElement.checked) {
        body.classList.add("dark-mode");
        image.src = "assets/che.png";
    } else {
        body.classList.remove("dark-mode");
        image.src = "assets/Cheshire_animado.gif";
    }
    restoreImage();  // Restaura a imagem ao alternar o modo
}

