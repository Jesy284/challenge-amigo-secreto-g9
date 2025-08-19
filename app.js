// Lista para almacenar los amigos
let amigos = [];

// Elementos del DOM
const inputAmigo = document.getElementById("amigo");
const btnAgregar = document.getElementById("addAmigo");
const btnSorteo = document.getElementById("btnSorteo");
const btnReiniciar = document.getElementById("btnReiniciar");
const listaAmigos = document.getElementById("listaAmigos");
const resultado = document.getElementById("resultado");

// Función para normalizar texto (quitar acentos y convertir a minúsculas)
function normalizarTexto(texto) {
    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, " ");
}

// Función para validar y limpiar nombre
function limpiarNombre(nombre) {
    // Eliminar espacios al inicio y final
    let nombreLimpio = nombre.trim();
    
    // Reemplazar múltiples espacios por uno solo
    nombreLimpio = nombreLimpio.replace(/\s{2,}/g, " ");
    
    return nombreLimpio;
}

// Función para agregar amigo a la lista
function agregarAmigo() {
    // Obtener y limpiar el nombre
    let nombre = inputAmigo.value;
    nombre = limpiarNombre(nombre);
    
    // Validar que no esté vacío
    if (nombre === "") {
        alert("Por favor, inserte un nombre.");
        return;
    }
    
    // Validar que no esté repetido (ignorando mayúsculas y acentos)
    const existe = amigos.some(amigo => 
        normalizarTexto(amigo) === normalizarTexto(nombre)
    );
    
    if (existe) {
        alert(`"${nombre}" ya está en la lista. Por favor, ingrese un nombre diferente.`);
        return;
    }
    
    // Agregar a la lista y actualizar
    amigos.push(nombre);
    mostrarLista();
    
    // Limpiar el campo y poner foco
    inputAmigo.value = "";
    inputAmigo.focus();
}

// Función para mostrar la lista de amigos
function mostrarLista() {
    listaAmigos.innerHTML = "";
    
    if (amigos.length === 0) {
        listaAmigos.innerHTML = '<p class="lista-vacia">Aún no hay amigos agregados</p>';
        return;
    }
    
    amigos.forEach((nombre, index) => {
        const amigoItem = document.createElement("div");
        amigoItem.className = "amigo-item";
        amigoItem.innerHTML = `
            <span class="amigo-numero">${index + 1}</span>
            <span class="amigo-nombre">${nombre}</span>
            <button class="amigo-eliminar" title="Eliminar amigo">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // Agregar evento de eliminación
        amigoItem.querySelector(".amigo-eliminar").addEventListener("click", () => {
            eliminarAmigo(index);
        });
        
        listaAmigos.appendChild(amigoItem);
    });
}

// Función para eliminar amigo
function eliminarAmigo(index) {
    amigos.splice(index, 1);
    mostrarLista();
}

// Función para sortear amigo secreto
function sortearAmigo() {
    // Validar que haya suficientes amigos
    if (amigos.length < 2) {
        alert("Necesitas al menos 2 amigos para sortear");
        return;
    }
    
    // Seleccionar ganador aleatorio
    const indiceGanador = Math.floor(Math.random() * amigos.length);
    const ganador = amigos[indiceGanador];
    
    // Mostrar resultado
    resultado.innerHTML = `
        <div class="ganador-container">
            <div class="corona">👑</div>
            <div class="ganador-nombre">${ganador}</div>
            <div class="mensaje">¡Es tu amigo secreto!</div>
        </div>
    `;
    
    // Deshabilitar controles
    inputAmigo.disabled = true;
    btnAgregar.disabled = true;
    btnSorteo.disabled = true;
    
    // Cambiar títulos
    inputAmigo.title = "Reinicia el sorteo para añadir más amigos";
    btnAgregar.title = "Reinicia el sorteo para añadir más amigos";
    btnSorteo.title = "Ya se realizó el sorteo";
}

// Función para reiniciar todo
function reiniciar() {
    // Vaciar lista
    amigos = [];
    
    // Limpiar interfaz
    mostrarLista();
    resultado.innerHTML = "";
    inputAmigo.value = "";
    
    // Habilitar controles
    inputAmigo.disabled = false;
    btnAgregar.disabled = false;
    btnSorteo.disabled = false;
    
    // Restaurar títulos
    inputAmigo.title = "Solo letras, espacios y acentos. Usa ENTER para añadir";
    btnAgregar.title = "Añadir amigo a la lista";
    btnSorteo.title = "Realizar sorteo de amigo secreto";
    
    // Poner foco en el campo
    inputAmigo.focus();
}

// Función para validar entrada de teclado
function validarTecla(event) {
    // Permitir tecla Enter para agregar
    if (event.key === "Enter") {
        agregarAmigo();
        return false;
    }
    
    // Expresión regular permitida
    const regex = /^[a-zA-ZáÁéÉíÍóÓúÚñÑ' ]$/;
    
    // Permitir teclas de control
    const teclasPermitidas = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"];
    if (teclasPermitidas.includes(event.key)) {
        return true;
    }
    
    // Validar caracter
    return regex.test(event.key);
}

// Inicializar la aplicación
function inicializar() {
    // Configurar eventos
    btnAgregar.addEventListener("click", agregarAmigo);
    btnSorteo.addEventListener("click", sortearAmigo);
    btnReiniciar.addEventListener("click", reiniciar);
    inputAmigo.addEventListener("keypress", validarTecla);
    
    // Mostrar lista vacía inicial
    mostrarLista();
}

// Iniciar cuando el documento esté listo
document.addEventListener("DOMContentLoaded", inicializar);
