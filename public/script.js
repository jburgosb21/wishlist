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
                <div style="display: flex; align-items: center; gap: 15px;">
                    <div class="precio">$${parseFloat(regalo.precio).toFixed(2)}</div>
                    <button onclick="eliminarRegalo(${regalo.id})" class="btn-delete">🗑️</button>
                </div>
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
            document.getElementById('nombre').value = '';
            document.getElementById('link').value = '';
            document.getElementById('precio').value = '';
            await cargarRegalos();
        } else {
            alert("Error al guardar el regalo");
        }
    } catch (error) {
        console.error("Error al enviar:", error);
    }
}

async function eliminarRegalo(id) {
    if (!confirm("¿Seguro que quieres eliminar este regalo?")) return;

    try {
        const respuesta = await fetch(`/api/regalos/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });

        if (respuesta.ok) {
            console.log("Regalo eliminado id:", id);
            await cargarRegalos(); 
        } else {
            const errorData = await respuesta.json();
            alert("Error del servidor: " + errorData.error);
        }
    } catch (error) {
        console.error("Error al eliminar:", error);
    }
}

cargarRegalos();