async function cargarRegalos() {
    const contenedor = document.getElementById('lista-regalos');
    try {
        const respuesta = await fetch('/api/regalos');
        const regalos = await respuesta.json();

        contenedor.innerHTML = ''; 

        if (regalos.length === 0) {
            contenedor.innerHTML = '<p>Aún no hay regalos en la lista.</p>';
            return;
        }

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
        console.error("Error:", error);
        contenedor.innerHTML = '<p>Error al conectar con el servidor.</p>';
    }
}

cargarRegalos();