async function cargarRegalos() {
    const contenedor = document.getElementById('lista-regalos');
    try {
        const respuesta = await fetch('/api/regalos');
        const regalos = await respuesta.json();

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
                    <a href="${regalo.link}" target="_blank">Ver en tienda 🔗</a>
                </div>
                <div class="precio">$${parseFloat(regalo.precio).toFixed(2)}</div>
            `;
            contenedor.appendChild(card);
        });
    } catch (error) {
        console.error("Error al cargar:", error);
        contenedor.innerHTML = '<p>Error al conectar con la base de datos.</p>';
    }
}

async function guardarRegalo() {
    const nombre = document.getElementById('nombre').value;
    const link = document.getElementById('link').value;
    const precio = document.getElementById('precio').value;

    if (!nombre || !link || !precio) {
        alert("Por favor, llena todos los campos");
        return;
    }

    try {
        const respuesta = await fetch('/api/regalos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                nombre, 
                link, 
                precio: parseFloat(precio), 
                user_id: 1 
            })
        });

        if (respuesta.ok) {
            // Limpiar campos
            document.getElementById('nombre').value = '';
            document.getElementById('link').value = '';
            document.getElementById('precio').value = '';
            // Recargar lista
            await cargarRegalos();
        } else {
            alert("Error al guardar el regalo");
        }
    } catch (error) {
        console.error("Error al enviar:", error);
    }
}

cargarRegalos();