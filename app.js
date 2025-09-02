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


//  FUNCIONES

// Función 1: Obtiene y valida la entrada del destino
// (Entrada de datos)
function obtenerDestino() {
    let destinoValido = false;

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
}

// Función 2: Calcula el costo del viaje principal
// (Procesamiento de datos)
function calcularCostoBase() {
    // Cantidad de días
    let inputDias = parseInt(prompt(`Has elegido ${destinoElegido.nombre}. \n\nAhora, ingresa la cantidad de días de tu viaje:`));

    if (!isNaN(inputDias) && inputDias > 0) {
        diasViaje = inputDias;
        costoTotal = destinoElegido.costoBase * diasViaje;
    } else {
        alert("Número de días no válido. Por favor, reinicia el simulador.");
        costoTotal = 0;
    }
}

// Función 3: Agregar extras
// (Entrada y procesamiento de datos)
function agregarExtras() {

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
}

// Función 4: Resultado final
// (Salida)
function mostrarResumen() {
    if (costoTotal > 0) {
        console.log("       RESUMEN DE TU VIAJE");
        console.log(`- Destino: ${destinoElegido.nombre}`);
        console.log(`- Duración: ${diasViaje} días`);
        
 
        if (extrasSeleccionados.length > 0) {
            console.log("- Extras:");
            extrasSeleccionados.forEach(extra => {
                console.log(`  - ${extra.nombre} ($${extra.costo} por día)`);
            });
        }
        
        console.log(`- COSTO TOTAL ESTIMADO: $${costoTotal}`);
        ;

    } else {
        console.log("No se pudo generar un presupuesto. Por favor, reinicia el simulador.");
    }
}



// PREGUNTA INICIAL AL VIAJERO

if (confirm("¿QUERES CALCULAR TU PROXIMO VIAJE?")) {
    obtenerDestino();
    if (destinoElegido) {
        calcularCostoBase();
        if (diasViaje > 0) {
            agregarExtras();
            mostrarResumen();
        }
    }
} else {
    alert("¡VOLVÉ A TU CASA!");
}

//Gracias por todo, Sol Cáffaro.