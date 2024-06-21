// pago.js

$("#frmNuevoPago").submit(function (e) {
    e.preventDefault();
    let data = {
        "id_pago": $("#id_pago").val(),
        "id_consulta": $("#id_consulta").val(),
        "fecha_pago": $("#fecha_pago").val(),
        "monto": $("#monto").val(),
        "id_paciente": $("#id_paciente").val(),
        "nombre_paciente": $("#nombre_paciente").val(),
    }

    fetch('http://127.0.0.1:5000/pagos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: data.mensaje,
                showConfirmButton: false,
                timer: 1500
            });

            listarPagos();
            cancelarPago();
        })
        .catch(error => {
            // Manejar cualquier error de la solicitud
            console.error(error);
        });
});

function crearPago() {
    $("#cardTablaPago").hide();
    $("#cardFrmCrearPago").show();
}

function cancelarPago() {
    $("#cardTablaPago").show();
    $("#cardFrmCrearPago").hide();
}

$("#FrmEditarPago").submit(function (e) { 
    e.preventDefault();
    let id = $("#id").val();
    let data = {
        "id_consulta": $("#id_consultaEd").val(),
        "fecha_pago": $("#fecha_pagoEd").val(),
        "monto": $("#montoEd").val(),
        "id_paciente": $("#id_pacienteEd").val(),
        "nombre_paciente": $("#nombre_pacienteEd").val(),
    }

    fetch('http://127.0.0.1:5000/pagos/'+id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: data.mensaje,
            showConfirmButton: false,
            timer: 1500
        });

        listarPacientes();
        cancelar2();
    });
});
function listarPagos() {
    fetch('http://127.0.0.1:5000/pagos')
        .then(response => response.json())
        .then(data => {
            let tablaPagos = document.getElementById("listaPagos");
            let html = '';
            let numero = 1;
            data.forEach(pagos => {
                html += `
                    <tr>
                        <td>${numero++}</td>
                        <td>${pagos.id_pago}</td>
                        <td>${pagos.id_consulta}</td>
                        <td>${pagos.fecha_pago}</td>
                        <td>${pagos.monto}</td>
                        <td>${pagos.id_paciente}</td>
                        <td>${pagos.nombre_paciente}</td>
                        <td>
                        <button class="btn btn-info">
                        <i class="fas fa-user-edit" onclick="editar(${pagos.id_pago})"></i>
                    </button>
                    <button class="btn btn-danger" onclick="eliminar(${pagos.id_pago})">
                        <i class="fas fa-user-times"></i>
                    </button>
                        </td>
                    </tr>
                `;
            });

            tablaPagos.innerHTML = html;
        })
        .catch(error => {
            // Manejar cualquier error de la solicitud
            console.error(error);
        });
}

listarPagos();
