// ── ESTADO DE LA APP ────────────────────────────────────────
var misiones = [];
var contadorId = 0; // Para darle un ID único a cada misión


// ── CREAR MISIÓN ────────────────────────────────────────────
function crearMision() {

  // Leer el formulario
  var nombre      = document.getElementById('mission-name').value;
  var descripcion = document.getElementById('mission-desc').value;
  var dificultad  = document.getElementById('mission-diff').value;

  // No admitir vacíos 
  if (nombre.trim() === '') {
    mostrarToast('El nombre de la misión es obligatorio.');
    return; // Salir de la función sin hacer nada más
  }

  // objeto mision
  var mision = {
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
  for (var i = 0; i < misiones.length; i++) {
    if (misiones[i].id === id) {
      misiones[i].status = 'SUCCESSFUL';
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
  var lista = document.getElementById('mission-list');

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
  for (var i = 0; i < misiones.length; i++) {
    var card = crearTarjeta(misiones[i]);
    lista.appendChild(card);
  }
}


// Crear tabla
// Recibe un objeto misión y devuelve un elemento HTML <div>.
function crearTarjeta(mision) {
  var diffNames = { easy: 'Fácil', normal: 'Normal', hard: 'Difícil' };

  // Crear el elemento div
  var card = document.createElement('div');
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
