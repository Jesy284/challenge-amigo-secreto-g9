// Vamos a crear nuestra lista de amigos
let amigos = [];

// Función para agregar amigos a la lista
function agregarAmigo() {
    // Paso 1: Obtener el nombre del campo de texto
    const inputAmigo = document.getElementById("amigo");
    let nombre = inputAmigo.value.trim();
    
    // Paso 2: Normalizar espacios (quitar espacios extras)
    nombre = nombre.replace(/\s+/g, ' ');
    
    // Validación 1: Que no esté vacío
    if (nombre === '') {
        alert("Por favor, escribe un nombre");
        return;
    }
    
    // Validación 2: Que no esté repetido (ignorando mayúsculas y acentos)
    const existe = amigos.some(amigo => 
        amigo.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === 
        nombre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    );
    
    if (existe) {
        alert(`${nombre} ya está en la lista ❤️`);
        return;
    }
    
    // Paso 3: Agregar a la lista y actualizar
    amigos.push(nombre);
    mostrarLista();
    
    // Paso 4: Limpiar el campo y poner foco
    inputAmigo.value = '';
    inputAmigo.focus();
}

// Función para mostrar la lista en pantalla
function mostrarLista() {
    const listaHTML = document.getElementById("listaAmigos");
    listaHTML.innerHTML = '';
    
    amigos.forEach((amigo, index) => {
        listaHTML.innerHTML += `
        <div class="amigo-item">
            <span class="numero">${index + 1}</span>
            <span class="nombre">${amigo}</span>
            <button class="eliminar" onclick="eliminarAmigo(${index})">
                <i class="fas fa-times"></i>
            </button>
        </div>
        `;
    });
}

// Función para eliminar un amigo
function eliminarAmigo(index) {
    amigos.splice(index, 1); // Quitamos de la lista
    mostrarLista(); // Actualizamos
}

// Función para el sorteo
function sortearAmigo() {
    // Validar que haya suficientes amigos
    if (amigos.length < 2) {
        alert("Necesitas al menos 2 amigos para sortear 💜");
        return;
    }
    
    // Seleccionar ganador aleatorio
    const ganadorIndex = Math.floor(Math.random() * amigos.length);
    const ganador = amigos[ganadorIndex];
    
    // Mostrar resultado
    document.getElementById("resultado").innerHTML = `
        <div class="ganador-container">
            <div class="corona">👑</div>
            <div class="ganador-nombre">${ganador}</div>
            <div class="mensaje">¡Es tu amigo secreto!</div>
        </div>
    `;
    
    // Deshabilitar botones después del sorteo
    document.getElementById("amigo").disabled = true;
    document.getElementById("addAmigo").disabled = true;
    document.getElementById("btnSorteo").disabled = true;
}

// Función para reiniciar todo
function reiniciar() {
    amigos = []; // Vaciar lista
    mostrarLista(); // Actualizar pantalla
    document.getElementById("resultado").innerHTML = '';
    
    // Habilitar campos
    document.getElementById("amigo").disabled = false;
    document.getElementById("addAmigo").disabled = false;
    document.getElementById("btnSorteo").disabled = false;
    
    // Poner foco en el campo
    document.getElementById("amigo").focus();
}

// Función para validar tecla Enter
function teclaEnter(event) {
    if (event.key === "Enter") {
        agregarAmigo();
    }
}
