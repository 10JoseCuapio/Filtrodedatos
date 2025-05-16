const fileInput = document.getElementById('fileInput');
const listaNombres = document.getElementById('listaNombres');
const detalle = document.getElementById('detalle');
const buscador = document.getElementById('buscador');
let datos = [];
const contador = document.getElementById('contador');

    // Función para parsear CSV simple
function parseCSV(text) {
    const lines = text.trim().split('\n');
    const headers = lines[0].split(',');
    return lines.slice(1).map(line => {
        const values = line.split(',');
        let obj = {};
        headers.forEach((h, i) => {
            obj[h.trim()] = values[i].trim();
        });
        return obj;
    });
}

function mostrarLista(filtrados) {
  listaNombres.innerHTML = '';

  filtrados.forEach((item, idx) => {
    const col = document.createElement('div');
    col.className = 'col';
    col.innerHTML = `
      <div class="nombre-item">${idx + 1}. ${item['Nombre completo']}</div>
    `;
    col.querySelector('.nombre-item').addEventListener('click', () => mostrarDetalle(item));
    listaNombres.appendChild(col);
  });

  contador.textContent = `Total de nombres: ${filtrados.length}`;
}

    function mostrarLista(filtrados) {
      listaNombres.innerHTML = '';
      filtrados.forEach((item, idx) => {
        const col = document.createElement('div');
        col.className = 'col';
        col.innerHTML = `<div class="nombre-item">${item['Nombre completo']}</div>`;
        col.querySelector('.nombre-item').addEventListener('click', () => mostrarDetalle(item));
        listaNombres.appendChild(col);
      });
    }

function mostrarDetalle(item) {
  // Si el detalle ya está visible con este nombre, ocultarlo
  if (detalle.style.display === 'block' && detalle.dataset.nombre === item['Nombre completo']) {
    detalle.style.display = 'none';
    detalle.innerHTML = '';
    detalle.dataset.nombre = '';
  } else {
    // Mostrar el detalle y guardar el nombre en un atributo data para comparar después
    detalle.style.display = 'block';
    detalle.innerHTML = `
    <div class="detalle">
        <span><strong>Nombre completo:</strong> ${item['Nombre completo']}</span>
        <span><strong>Edad:</strong> ${item['Edad']}</span>
        <span><strong>Sexo:</strong> ${item['Sexo']}</span>
        <span><strong>Ocupación:</strong> ${item['Ocupación']}</span>
        <span><strong>Nivel de estudios:</strong> ${item['Nivel de estudios']}</span>
    </div>
    `;
    detalle.dataset.nombre = item['Nombre completo'];
  }
}


    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        datos = parseCSV(event.target.result);
        mostrarLista(datos);
        detalle.style.display = 'none';
        buscador.value = '';
      };
      reader.readAsText(file);
    });

    buscador.addEventListener('input', () => {
      const texto = buscador.value.toLowerCase();
      const filtrados = datos.filter(item => item['Nombre completo'].toLowerCase().includes(texto));
      mostrarLista(filtrados);
      detalle.style.display = 'none';
    });