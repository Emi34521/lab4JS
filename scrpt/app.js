// ── ESTADO DE LA APP ────────────────────────────────────────
let misiones = [];
let contadorId = 0; // Para darle un ID único a cada misión
let EXPcount= 0; // Contador de experiencia global




// ── CREAR MISIÓN ────────────────────────────────────────────
function crearMision() {

  // Leer el formulario
  let nombre      = document.getElementById('mission-name').value;
  let descripcion = document.getElementById('mission-desc').value;
  let dificultad  = document.getElementById('mission-diff').value;

  // No admitir vacíos 
  if (nombre.trim() === '') {
    mostrarToast('El nombre de la misión es obligatorio.');
    return; // Salir de la función sin hacer nada más
  }

  // objeto mision
  let mision = {
    id:          contadorId,
    nombre:      nombre,
    descripcion: descripcion,
    dificultad:  dificultad,
    status:      'PENDING'
  };

  contadorId++; // Incrementar para la próxima misión

  // consol.log de verifiación
  console.log('Misión creada:', mision);

  // Agregar al array
  misiones.push(mision);

  // Limpiar formulario
  document.getElementById('mission-name').value = '';
  document.getElementById('mission-desc').value = '';
  document.getElementById('mission-diff').value = 'normal';

  // Redibujar la lista
  renderLista();
  mostrarToast('¡Misión "' + nombre + '" creada!');
}


// Completar misión
function completarMision(id) {

  // Buscar la misión en el array por su id
  for (let i = 0; i < misiones.length; i++) {
    if (misiones[i].id === id) {
      misiones[i].status = 'SUCCESSFUL';
      actualizarEXP(misiones[i]);
      break; //encontrada 
    }
  }

  // Redibujar la lista para reflejar el cambio
  renderLista();
  mostrarToast('¡Misión completada!');
}


// Renderizar lsita
// Esta función borra y redibuja todas las tarjetas desde cero.
// Se llama cada vez que el estado cambia.
function renderLista() {
  let lista = document.getElementById('mission-list');

  // Limpiar el contenido actual
  lista.innerHTML = '';

  // Si no hay misiones, mostrar el estado vacío
  if (misiones.length === 0) {
    lista.innerHTML = '<p id="empty-state">Aún no tienes misiones. ¡Crea una para comenzar!</p>';
    document.getElementById('mission-count').textContent = '0 misiones';
    return;
  }

  // Actualizar el contador de misiones
  document.getElementById('mission-count').textContent = misiones.length + ' misiones';

  // Crear una tarjeta por cada misión en el array
  for (let i = 0; i < misiones.length; i++) {
    let card = crearTarjeta(misiones[i]);
    lista.appendChild(card);
  }
}

//  Actualizar exp y rango
// Recibe la misión completada para saber cuánto XP sumar.
function actualizarEXP(mision) {

  // Sumar XP según la dificultad de la misión recibida
  if (mision.dificultad === 'easy') {
    EXPcount += 10;
  } else if (mision.dificultad === 'normal') {
    EXPcount += 25;
  } else if (mision.dificultad === 'hard') {
    EXPcount += 50;
  }

  // Actualizar el número en pantalla
  document.getElementById('xp-total').textContent = EXPcount;

  // Decidir el rango según el XP acumulado
  var rango;
  if (EXPcount === 0) {
    rango = 'Novice';
  } else if (EXPcount <= 30) {
    rango = 'Adept';
  } else if (EXPcount <= 60) {
    rango = 'Disciple';
  } else if (EXPcount <= 100) {
    rango = 'Warden';
  } else if (EXPcount <= 150) {
    rango = 'Sentinel';
  } else if (EXPcount <= 210) {
    rango = 'Vanguard';
  } else if (EXPcount <= 280) {
    rango = 'Invoker';
  } else if (EXPcount <= 360) {
    rango = 'Mystic';
  } else if (EXPcount <= 450) {
    rango = 'Warlock';
  } else if (EXPcount <= 550) {
    rango = 'Sorcerer';
  } else if (EXPcount <= 700) {
    rango = 'Champion';
  } else {
    rango = 'Overseer';
  }

  // Mostrar el rango en pantalla
  document.getElementById('rank-label').textContent = rango;
}

// Crear tabla
// Recibe un objeto misión y devuelve un elemento HTML <div>.
function crearTarjeta(mision) {
  let diffNames = { easy: 'Fácil', normal: 'Normal', hard: 'Difícil' };

  // Crear el elemento div
  let card = document.createElement('div');
  card.classList.add('mission-card');

  // Si está completada, agregar la clase visual "done"
  if (mision.status === 'SUCCESSFUL') {
    card.classList.add('done');
  }

  // Construir el HTML interno de la tarjeta
  card.innerHTML =
    '<div class="mission-body">' +
      '<div class="mission-nombre">' + mision.nombre + '</div>' +
      '<p class="mission-desc">' + mision.descripcion + '</p>' +
      '<div class="mission-meta">' +
        '<span class="badge-dificultad ' + mision.dificultad + '">' + diffNames[mision.dificultad] + '</span>' +
        '<span class="mission-status ' + (mision.status === 'SUCCESSFUL' ? 'successful' : 'pending') + '">' +
          (mision.status === 'SUCCESSFUL' ? ' SUCCESSFUL' : ' PENDING') +
        '</span>' +
      '</div>' +
    '</div>' +
    '<button class="btn-completar" onclick="completarMision(' + mision.id + ')"' +
      (mision.status === 'SUCCESSFUL' ? ' disabled' : '') + '>' +
      (mision.status === 'SUCCESSFUL' ? 'Hecho' : 'Completar') +
    '</button>';

  return card;
}
