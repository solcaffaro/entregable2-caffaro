//  ENTRADAS DE DATOS: VARIABLES, CONSTANTES Y ARRAYS


// Array de objetos con destinos y sus costos base por día
const destinos = [
    { nombre: "Ushuaia", costoBase: 50 },
    { nombre: "Bariloche", costoBase: 40 },
    { nombre: "Mendoza", costoBase: 45 }
];

// Array de opciones de extras con sus costos
const extras = [
    { nombre: "alquiler de auto", costo: 30 },
    { nombre: "tour guiado", costo: 20 },
    { nombre: "seguro de viaje", costo: 10 }
];


// Variables para almacenar la elección del usuario
let destinoElegido = "";
let diasViaje = 0;
let costoTotal = 0;
let extrasSeleccionados = [];

// ELEMENTOS DEL DOM
const formulario = document.getElementById("formularioViaje");
const resumenViajeDiv = document.getElementById("resumenViaje");
const contenedorDestinos = document.getElementById("destino");


//  FUNCIONES

// Función 1: Obtiene y valida la entrada del destino
// (Entrada de datos)

function obtenerDestino(nombreDestino) {
    return destinos.find(d => d.nombre.toLowerCase() === nombreDestino.toLowerCase());
}

    // Ciclo 'while' para confirmar un destino válido
    while (!destinoValido) {
        let input = prompt("¡Bienvenido al simulador de viajes! \n\nElige tu destino: \n- Bariloche \n- Ushuaia \n- Mendoza");

        // Ciclo 'for' para buscar la coincidencia en el array de destinos
        for (let i = 0; i < destinos.length; i++) {
            if (destinos[i].nombre === input) {
                destinoElegido = destinos[i];
                destinoValido = true;
                break;
            }
        }
        if (!destinoValido) {
            alert("Destino no válido. Por favor, elige uno de la lista.");
        }
    }


// Función 2: Calcula el costo del viaje principal
function calcularCostoBase(destino, dias) {
    return destino.costoBase * dias;
}
    // Cantidad de días
    let inputDias = parseInt(prompt(`Has elegido ${destinoElegido.nombre}. \n\nAhora, ingresa la cantidad de días de tu viaje:`));

    if (!isNaN(inputDias) && inputDias > 0) {
        diasViaje = inputDias;
        costoTotal = destinoElegido.costoBase * diasViaje;
    } else {
        alert("Número de días no válido. Por favor, reinicia el simulador.");
        costoTotal = 0;
    }


// Función 3: Agregar extras
// (Entrada y procesamiento de datos)
function agregarExtras(dias) {
    let costoExtras = 0;
    extrasSeleccionados.forEach(extra => {
        costoExtras += extra.costo * dias;
    });
    return costoExtras;
}

    if (confirm("¿Quieres agregar algunos extras a tu viaje?")) {
        let agregarMas = true;


        while (agregarMas) {

            let mensajeExtras = "Elige un extra para tu viaje: \n";
            for (let i = 0; i < extras.length; i++) {
                mensajeExtras += `- ${extras[i].nombre} ($${extras[i].costo} por día)\n`;
            }
            mensajeExtras += "\n(Escribe 'fin' para terminar)";

            let inputExtra = prompt(mensajeExtras);


            if (inputExtra === "fin") {
                agregarMas = false;
            } else {
                let extraEncontrado = false;
                for (let i = 0; i < extras.length; i++) {
                    if (extras[i].nombre === inputExtra) {
                        extrasSeleccionados.push(extras[i]); // Se agrega el extra al array
                        costoTotal += extras[i].costo * diasViaje;
                        extraEncontrado = true;
                        alert(`Se agregó ${extras[i].nombre}. Costo actual del viaje: $${costoTotal}`);
                        break;
                    }
                }
                if (!extraEncontrado) {
                    alert("Opción de extra no válida.");
                }
            }
        }
    }


// Función 4: Resultado final
// (Salida)

function obtenerDatosDelFormulario() {

    // Obtiene el valor del destino
    const nombreDestinoSeleccionado = contenedorDestinos.value;
    destinoElegido = encontrarDestino(nombreDestinoSeleccionado);

    // Obtiene la cantidad de días
    diasViaje = parseInt(document.getElementById("dias").value);

    // Obtiene los extras seleccionados
    extrasSeleccionados = [];
    const checkboxesExtras = document.querySelectorAll('input[name="extras"]:checked');
    checkboxesExtras.forEach(checkbox => {
        const extraSeleccionado = extras.find(e => e.nombre === checkbox.value);
        if (extraSeleccionado) {
            extrasSeleccionados.push(extraSeleccionado);
        }
    });
}

// FUNCIONES DE INTERACCIÓN
function manejarEnvioFormulario(e) {
    e.preventDefault();

    obtenerDatosDelFormulario();

    // Validación básica para evitar errores de cálculo
    if (diasViaje <= 0 || !destinoElegido) {
        resumenViajeDiv.innerHTML = "<p class='error'>Por favor, ingresa un número de días válido y un destino.</p>";
        return;
    }

    // Procesa los datos y calcula el costo total
    costoTotal = calcularCostoBase(destinoElegido, diasViaje);
    costoTotal += calcularCostoExtras(diasViaje);

    // Muestra el resumen en el DOM
    mostrarResumen();

    // Guarda los datos del viaje en localStorage
    guardarViajeEnStorage();
}

function mostrarResumen() {
    let htmlExtras = extrasSeleccionados.length > 0 ? "<ul>" : "";
    extrasSeleccionados.forEach(extra => {
        htmlExtras += `<li>${extra.nombre} ($${extra.costo} por día)</li>`;
    });
    htmlExtras += extrasSeleccionados.length > 0 ? "</ul>" : "";

    resumenViajeDiv.innerHTML = `
        <h3>RESUMEN DE TU VIAJE</h3>
        <p><strong>Destino:</strong> ${destinoElegido.nombre}</p>
        <p><strong>Duración:</strong> ${diasViaje} días</p>
        ${extrasSeleccionados.length > 0 ? `<p><strong>Extras:</strong></p>${htmlExtras}` : ''}
        <p class="costo-total"><strong>COSTO TOTAL ESTIMADO:</strong> $${costoTotal}</p>
    `;
    console.log("Datos del viaje guardados en localStorage.");
}

// FUNCIONES DE STORAGE
function guardarViajeEnStorage() {
    const datosViaje = {
        destino: destinoElegido,
        dias: diasViaje,
        extras: extrasSeleccionados,
        costoTotal: costoTotal
    };
    localStorage.setItem("ultimoViaje", JSON.stringify(datosViaje));
}

function cargarViajeAnterior() {
    const datosGuardados = JSON.parse(localStorage.getItem("ultimoViaje"));

    if (datosGuardados) {
        resumenViajeDiv.innerHTML = `
            <h3>Datos del último viaje guardados:</h3>
            <p><strong>Destino:</strong> ${datosGuardados.destino.nombre}</p>
            <p><strong>Costo total:</strong> $${datosGuardados.costoTotal}</p>
            <hr>
        `;
    }
}
// EVENTOS
cargarViajeAnterior();
formulario.addEventListener("submit", manejarEnvioFormulario);

//Gracias por todo, Sol Cáffaro.