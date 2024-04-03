//Função para validar o input
function validarInput(input) {
    let textoValidado = input.value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    input.value = textoValidado;  
    return textoValidado;
}

// Elementos do DOM
let textInput = document.querySelector("#input_texto");
let outputDiv = document.querySelector("#output_text");  
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
}

// Função para descriptografar o texto
function descriptografar() {
    var texto = validarInput(textInput);
    var resultDescripto = replaceUsingMap(texto, decryptMap);
    updateOutput(resultDescripto);
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
    if (outputDiv.textContent.trim() !== '') {
        navigator.clipboard.writeText(outputDiv.textContent);
        alert("Texto copiado!");
    }
}

// Função para limpar os campos
function limpar() {
    textInput.value = '';
    outputDiv.textContent = '';  
    restoreImages();
}

// Função para atualizar a saída
function updateOutput(text) {
    outputDiv.textContent = text;

    if (text.trim() === '') {
        restoreImages();
    } else {
        clearImages();
    }
}

// Função para limpar imagens
function clearImages() {
    imageContainer.style.display = 'none';  // Esconde a imagem  
}

// Função para restaurar a imagem
function restoreImages() {
    var body = document.body;
    var imagePath = body.classList.contains("dark-mode") ? "assets/Cheshire_dark.png" : "assets/Cheshire_animado.gif";
    imageContainer.innerHTML = `<img id="image" src="${imagePath}" alt="cheshire">`;
    imageContainer.style.display = 'block';  

    var imagePath2 = body.classList.contains("dark-mode") ? "assets/decodificador_dark.png" : "assets/decodificador.png";
    imageContainer2.innerHTML = `<img id="image2" src="${imagePath2}" alt="decodificador">`;
    imageContainer2.style.display = 'block';  
}

// Função para alternar o modo escuro
function toggleDarkMode() {
    var body = document.body;
    var switchElement = document.querySelector(".switch input");

    if (switchElement.checked) {
        body.classList.add("dark-mode");
    } else {
        body.classList.remove("dark-mode");
    }

    updateImages(); // Atualiza as imagens após mudar o modo
}

// Função para atualizar as imagens
function updateImages() {
    var body = document.body;
    var imagePath = body.classList.contains("dark-mode") ? "assets/Cheshire_dark.png" : "assets/Cheshire_animado.gif";
    var imagePath2 = body.classList.contains("dark-mode") ? "assets/decodificador_dark.png" : "assets/decodificador.png";

    imageContainer.innerHTML = `<img id="image" src="${imagePath}" alt="cheshire">`;
    imageContainer2.innerHTML = `<img id="image2" src="${imagePath2}" alt="decodificador">`;

    if (outputDiv.textContent.trim() === '') {
        imageContainer.style.display = 'block';
        imageContainer2.style.display = 'block';
    } else {
        imageContainer.style.display = 'none';
        imageContainer2.style.display = 'block';
    }
}