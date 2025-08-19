// Variables globales
let amigos = [];

// Función para añadir amigo a la lista
function agregarAmigo() {
    // Obtener y normalizar nombre
    const inputAmigo = document.querySelector("#amigo");
    let nombreAmigo = normalizaEspacios(inputAmigo.value.trim());
    inputAmigo.value = nombreAmigo;

    // Validaciones
    if (!nombreAmigo) {
        alert("Por favor, inserte un nombre.");
        return;
    }

    // Verificar duplicados
    const existeDuplicado = amigos.some(
        nombre => normalizarTexto(nombre) === normalizarTexto(nombreAmigo)
    );
    
    if (existeDuplicado) {
        alert(`Ya se ha añadido a: ${nombreAmigo}. Ingrese un nombre diferente.`);
    } else {
        amigos.push(nombreAmigo);
        listarAmigos();
        inputAmigo.value = "";
    }
    
    inputAmigo.focus();
}

// Función para listar amigos en pantalla
function listarAmigos() {
    const lista = document.querySelector("#listaAmigos");
    lista.innerHTML = "";
    
    amigos.forEach((nombre, i) => {
        lista.innerHTML += `
            <div class="amigo-item">
                <span class="amigo-numero">${i + 1}</span>
                <span class="amigo-nombre">${nombre}</span>
                <button class="amigo-eliminar" onclick="eliminarAmigo(${i})" title="Eliminar amigo">
                    <span>&times;</span>
                </button>
            </div>
        `;
    });
}

// Función para eliminar amigo
function eliminarAmigo(indice) {
    amigos.splice(indice, 1);
    listarAmigos();
}

// Función para sortear amigo secreto
function sortearAmigo() {
    if (amigos.length < 2) {
        alert("Debe añadir al menos 2 amigos para sortear.");
        return;
    }
    
    const indiceGanador = Math.floor(Math.random() * amigos.length);
    const ganador = amigos[indiceGanador];
    
    document.querySelector("#resultado").innerHTML = `
        <div class="resultado-item">
            <p>¡Tu amigo secreto es!</p>
            <div class="ganador">
                <span class="numero-ganador">${indiceGanador + 1}</span>
                <span class="nombre-ganador">${ganador}</span>
            </div>
            <img src="assets/regalo.png" alt="Regalo" class="regalo-icon">
        </div>
    `;
    
    // Deshabilitar controles después del sorteo
    ["#amigo", "#addAmigo", "#btnSorteo"].forEach(selector => {
        const element = document.querySelector(selector);
        element.disabled = true;
        element.title = "Reinicie el sorteo para continuar";
    });
}

// Función para reiniciar el sorteo
function reiniciaEstados() {
    amigos = [];
    document.querySelector("#amigo").value = "";
    document.querySelector("#listaAmigos").innerHTML = "";
    document.querySelector("#resultado").innerHTML = "";
    
    // Habilitar controles
    ["#amigo", "#addAmigo", "#btnSorteo"].forEach(selector => {
        const element = document.querySelector(selector);
        element.disabled = false;
        element.title = selector === "#amigo" 
            ? "Solo letras y espacios. Use ENTER para añadir" 
            : "";
    });
    
    document.querySelector("#amigo").focus();
}

// Funciones de utilidad
function normalizarTexto(texto) {
    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, " ");
}

function normalizaEspacios(texto) {
    return texto.replace(/\s{2,}/g, " ");
}

// Validación de entrada de teclado
function validaTecla(e) {
    if (e.key === "Enter") {
        e.preventDefault();
        document.getElementById("addAmigo").click();
        return false;
    }
    
    // Expresión regular permitida
    const regex = /^[a-zA-ZáÁéÉíÍóÓúÚñÑ'\s]$/;
    return regex.test(e.key);
}

// Inicialización
reiniciaEstados();
