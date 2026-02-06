async function cargarRegalos() {
    const contenedor = document.getElementById('lista-regalos');
    try {
        const respuesta = await fetch('/api/regalos');
        const regalos = await respuesta.json();
        contenedor.innerHTML = ''; 

        regalos.forEach(regalo => {
            const card = document.createElement('div');
            card.className = 'regalo-card';
            card.innerHTML = `
                <div class="info">
                    <strong>${regalo.nombre}</strong><br>
                    <a href="${regalo.link}" target="_blank">Ver en tienda 🔗</a>
                </div>
                <div class="precio">$${regalo.precio}</div>
            `;
            contenedor.appendChild(card);
        });
    } catch (error) {
        contenedor.innerHTML = '<p>Error al cargar la lista.</p>';
    }
}

async function guardarRegalo() {
    const nombre = document.getElementById('nombre').value;
    const link = document.getElementById('link').value;
    const precio = document.getElementById('precio').value;

    await fetch('/api/regalos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, link, precio, user_id: 1 })
    });

    // Limpiar campos y recargar
    document.getElementById('nombre').value = '';
    document.getElementById('link').value = '';
    document.getElementById('precio').value = '';
    cargarRegalos();
}

cargarRegalos();