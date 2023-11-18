let personajeList = []; // Declara una variable para almacenar los datos

const iconosHabilidades = {
  fuerza: '',
  destreza: '',
  constitucion: '',
  inteligencia: '',
  carisma: ''
};

document.addEventListener("DOMContentLoaded", function () {
  // Realiza una solicitud AJAX para obtener el archivo JSON
  fetch('/data.json') // Ruta donde se encuentra el archivo JSON en tu servidor
    .then(response => response.json())
    .then(data => {
      // Almacena los datos en la variable personajeList
      personajeList = data;

      // // Procesa y muestra los datos en la página web
      // mostrarDatos(personajeList);

      // Llama a la función para actualizar el equipo
      actualizarEquipo();
    })
    .catch(error => {
      console.error('Error al obtener data.json:', error);
    });
});

// // Función para mostrar los datos en la página web
// function mostrarDatos(data) {
//   const datosContainer = document.getElementById('datos');
//   datosContainer.innerHTML = ''; // Borra cualquier contenido existente en el contenedor

//   // Verifica si 'data' es un array antes de procesarlo
//   if (Array.isArray(data)) {
//     // Itera a través de los datos y crea elementos para mostrarlos
//     data.forEach(item => {
//       const elemento = document.createElement('div');
//       elemento.textContent = `equipo: ${item.equipo} Nombre: ${item.nombre}, Raza: ${item.raza}, Clase: ${item.clase}, fuerza: ${item.fuerza}, destreza: ${item.destreza}, constitucion: ${item.constitucion}, inteligencia: ${item.inteligencia}, carisma: ${item.carisma}`;
//       datosContainer.appendChild(elemento);
//     });
//   } else {
//     console.error('Los datos en data.json no son un array válido:', data);
//     // Puedes mostrar un mensaje de error en el contenedor o realizar alguna otra acción apropiada aquí
//   }
// };

// Array de locaciones
const locacionesImg = [
'https://i.imgur.com/8zxPCVv.png',
'https://i.imgur.com/jtLtkpK.png',
'https://i.imgur.com/YW0s3V3.png',
'https://i.imgur.com/oDWuqQu.png',
'https://i.imgur.com/gSGVLD5.png',
'https://i.imgur.com/YsF5OAU.png',
'https://i.imgur.com/PgdSsBw.png',
'https://i.imgur.com/Q0UQgmP.png'
];

// SLIDER
// Variable para llevar un registro de la imagen actual
let locacionActual = 0;

// Obtener el elemento de imagen y el botones
const locacion = document.getElementById('imgLocacion');
const btnRetroceder = document.getElementById('retroceder');
const btnAvanzar = document.getElementById('avanzar');


//Función para retroceder
function retrocederImg() {
  // Verifica si hemos llegado al final del array de locaciones
  if(locacionActual > 0) {
      // Decrementa el índice y establece la fuente (src) de la imagen actual
      locacionActual--;
      locacion.style.opacity = 0;
      setTimeout(() => {
        locacion.src = locacionesImg[locacionActual];
        locacion.style.opacity = 1;
        actualizarIndicadores();
      }, 200);
  }
}

// Función para avanzar
function avanzarImg() {
  if (locacionActual < locacionesImg.length - 1) {
      locacionActual++;
      locacion.style.opacity = 0; // Establece la opacidad a 0 (imagen invisible)
      setTimeout(() => {
          locacion.src = locacionesImg[locacionActual];
          locacion.style.opacity = 1; // Establece la opacidad a 1 (imagen visible)
          actualizarIndicadores();
      }, 200); // Espera 500 ms antes de cambiar la imagen (ajusta el tiempo según desees)
  }
};

// Asigna las funciones a los eventos clic en los botones
btnRetroceder.addEventListener('click', retrocederImg);
btnAvanzar.addEventListener('click', avanzarImg);

// Muestra la primer imagen
locacion.src = locacionesImg[locacionActual];

// Indicadores
const indicadoresContenedor = document.querySelector('#indicadores');

// Crear indicadores automáticamente
locacionesImg.forEach((imagen, index) => {
const indicador = document.createElement('div');
indicador.classList.add('indicador');
indicador.dataset.index = index;
indicadoresContenedor.appendChild(indicador);
});

// Función para actualizar los indicadores
function actualizarIndicadores() {
const indicadores = document.querySelectorAll('.indicador');
indicadores.forEach((indicador, index) => {
  if(index === locacionActual) {
    indicador.classList.add('activo');
  } else {
    indicador.classList.remove('activo');
  }
});
}
// Llama a la función para mostrar los indicadores iniciales
actualizarIndicadores();


// BOTONES PARA CAMBIAR EQUIPO
let equipoFijado = 1;

const btnEquipoUno = document.querySelector('#equipo-1');
const btnEquipoDos = document.querySelector('#equipo-2');

btnEquipoUno.addEventListener('click', cambiarEquipoUno);
btnEquipoDos.addEventListener('click', cambiarEquipoDos);

function cambiarEquipoUno() {
  equipoFijado = 1;
  actualizarEquipo();
}
function cambiarEquipoDos() {
  equipoFijado = 2;
  actualizarEquipo();
}

// Función para actualizar el equipo en la interfaz
function actualizarEquipo() {
  // Obtener el contenedor donde se agregarán los personajes
  const contenedorPersonajes = document.getElementById('contenedor-personajes');

  // Borrar los personajes existentes en la interfaz
  contenedorPersonajes.innerHTML = '';

  // Filtrar el equipo que corresponde al valor de 'equipoFijado'
  const equipoActual = personajeList.filter(personaje => personaje.equipo === equipoFijado);

  // Iterar a través de la lista de personajes filtrados y crear elementos para mostrarlos
  for (const personaje of equipoActual) {
    const personajeDiv = document.createElement('div');
    personajeDiv.classList.add('personaje');

      // Elementos para la imagen del personaje
      const imgDiv = document.createElement('div');
      imgDiv.classList.add('img');

      const img = document.createElement('img');
      img.setAttribute('src', personaje.foto);
      img. setAttribute('alt', 'Imagen de personaje');

      imgDiv.appendChild(img);

      // Elementos del HUD del personaje
      const hudDiv = document.createElement('div');
      hudDiv.classList.add('personaje__hud');

      const contenedorHudDiv = document.createElement('div');
      contenedorHudDiv.classList.add('contenedor__hud');

      const nivelDiv = document.createElement('div');
      nivelDiv.classList.add('nivel');
      nivelDiv.innerHTML = `<p>${personaje.nivel}</p>`;

      const vidaContenedorDiv = document.createElement('div');
      vidaContenedorDiv.classList.add('vida__contenedor');

      const vidaSpan = document.createElement('span');
      vidaSpan.classList.add('vida');
      vidaSpan.textContent = `${personaje.salud}/20`;

      // Calcular el ancho de la barra de vida
      const valorMaximoVida = 20;
      const anchoBarra = (personaje.salud / valorMaximoVida) * 100 + '%';
      vidaSpan.style.width = anchoBarra;

      // Agregar elementos a sus padres
      hudDiv.appendChild(contenedorHudDiv);
      contenedorHudDiv.appendChild(nivelDiv);
      contenedorHudDiv.appendChild(vidaContenedorDiv);
      vidaContenedorDiv.appendChild(vidaSpan);

      // Nombre del personaje
      const nombreDiv = document.createElement('div');
      nombreDiv.classList.add('nombre__personaje');

      const nombreH2 = document.createElement('h2');
      nombreH2.textContent = personaje.nombre;

      hudDiv.appendChild(nombreDiv);
      nombreDiv.appendChild(nombreH2);

      // Raza y clase del personaje
      const razaH3 = document.createElement('h3');
      razaH3.textContent = personaje.raza + ' ' + personaje.clase;

      nombreDiv.appendChild(razaH3);


    // Elementos de Habilidades
    const habilidadesDiv = document.createElement('div');
    habilidadesDiv.classList.add('habilidades');

    // Itera a través de las habilidades del personaje
    for (const habilidad in personaje) {
      // Verifica si la propiedad es una habilidad (para evitar otras propiedades no deseadas)
      if (habilidad !== 'equipo' && habilidad !== 'nivel' && habilidad !== 'foto' && habilidad !== 'nombre' && habilidad !== 'salud' && habilidad !== 'raza' && habilidad !== 'clase') {
        const columnaDiv = document.createElement('div');
        columnaDiv.classList.add('columna');
        columnaDiv.id = habilidad; // Asigna el ID de la habilidad como se muestra en tu estructura HTML

        const iconDiv = document.createElement('div');
        iconDiv.classList.add('icon');
        iconDiv.textContent = iconosHabilidades[habilidad];

        const valorDiv = document.createElement('div');
        valorDiv.classList.add('valor');
        valorDiv.innerHTML = `<p>${personaje[habilidad]}</p>`;

        columnaDiv.appendChild(iconDiv);
        columnaDiv.appendChild(valorDiv);
        habilidadesDiv.appendChild(columnaDiv);
      }
    };

      // Agregar todos los elementos al div del personaje
      personajeDiv.appendChild(imgDiv);
      personajeDiv.appendChild(hudDiv);
      personajeDiv.appendChild(habilidadesDiv);

      // Agregar el div del personaje al contenedor principal
      contenedorPersonajes.appendChild(personajeDiv);
    };
};
actualizarEquipo();