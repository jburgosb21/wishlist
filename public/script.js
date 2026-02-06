async function cargarRegalos() {
    const contenedor = document.getElementById('lista-regalos');
    try {
        // Usamos la ruta completa para evitar errores de dirección
        const respuesta = await fetch(window.location.origin + '/api/regalos');
        const regalos = await respuesta.json();
        
        console.log("Datos recibidos:", regalos); // Esto te ayudará a ver errores en la consola (F12)

        contenedor.innerHTML = ''; 

        if (regalos.length === 0) {
            contenedor.innerHTML = '<p>No hay regalos. ¡Añade el primero!</p>';
            return;
        }

        regalos.forEach(regalo => {
            const card = document.createElement('div');
            card.className = 'regalo-card';
            card.innerHTML = `
                <div class="info">
                    <strong>${regalo.nombre}</strong><br>
                    <a href="${regalo.link}" target="_blank">Ver tienda 🔗</a>
                </div>
                <div class="precio">$${regalo.precio}</div>
            `;
            contenedor.appendChild(card);
        });
    } catch (error) {
        console.error("Error en Fetch:", error);
        contenedor.innerHTML = '<p>Error al conectar con la base de datos.</p>';
    }
}

cargarRegalos();