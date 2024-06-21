$("#frmNuevoPaciente").submit(function (e) { 
    e.preventDefault();
    let data = {
        "nombre": $("#nombre").val(),
        "apellido": $("#apellido").val(),
        "telefono": $("#telefono").val(),
        "direccion": $("#direccion").val(),
        "fecha_nacimiento": $("#fecha_nacimiento").val(),
    }

    fetch('http://127.0.0.1:5000/pacientes', {
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

        listarPacientes();
        cancelar();
    })
    .catch(error => {
        // Manejar cualquier error de la solicitud
        console.error(error);
    });
});

function agregar() {
    $("#cardTabla").hide();
    $("#cardFrmCrear").show();
}

function cancelar() {
    $("#cardTabla").show();
    $("#cardFrmCrear").hide();
}

function editar(id_paciente) {
    $("#cardTabla").hide();
    $("#cardFrmEditar").show();

    fetch('http://127.0.0.1:5000/pacientes/'+id_paciente)
    .then(response => response.json())
    .then(data => {
        $("#id").val(id_paciente);
        $("#nombreEd").val(data.nombre);
        $("#apellidoEd").val(data.apellido);
        $("#direccionEd").val(data.direccion);
        $("#telefonoEd").val(data.telefono);
        
        const fechaOriginal = data.fecha_nacimiento;
        const fecha = new Date(fechaOriginal);
        const año = fecha.getFullYear();
        const mes = String(fecha.getMonth() + 1).padStart(2, '0');
        const dia = String(fecha.getDate()).padStart(2, '0');

        const fechaFormateada = `${año}-${mes}-${dia}`;
        $("#fecha_nacimientoEd").val(fechaFormateada);
    })
}

$("#frmEditarPaciente").submit(function (e) { 
    e.preventDefault();
    let id = $("#id").val();
    let data = {
        "nombre": $("#nombreEd").val(),
        "apellido": $("#apellidoEd").val(),
        "telefono": $("#telefonoEd").val(),
        "direccion": $("#direccionEd").val(),
        "fecha_nacimiento": $("#fecha_nacimientoEd").val(),
    }

    fetch('http://127.0.0.1:5000/pacientes/'+id, {
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

function cancelar2() {
    $("#id").val("");
    $("#cardTabla").show();
    $("#cardFrmEditar").hide();
}

function eliminar(id_paciente) {
    Swal.fire({
        title: "Seguro en eliminar el paciente",
        text: "No podra revertir esta accion",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Eliminar"
      }).then((result) => {
        if (result.isConfirmed) {
            fetch('http://127.0.0.1:5000/pacientes/'+id_paciente, {
                method: 'DELETE'
              })
            .then(response => response.json())
            .then(data => {
                if(data.estado == "true") {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: data.mensaje,
                        showConfirmButton: false,
                        timer: 1500
                    });
                } else {
                    Swal.fire({
                        position: "top-end",
                        icon: "error",
                        title: data.mensaje,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                
        
                listarPacientes();
            })
        }
      });
}


function listarPacientes() {
    fetch('http://127.0.0.1:5000/pacientes')
    .then(response => response.json())
    .then(data => {
        let tablaPacientes = document.getElementById("listaPacientes");
        let html = '';
        let numero = 1;
        data.forEach(paciente => {
            html += `
                <tr>
                    <td>${numero++}</td>
                    <td>${paciente.nombre}</td>
                    <td>${paciente.apellido}</td>
                    <td>${paciente.telefono}</td>
                    <td>${paciente.direccion}</td>
                    <td>${paciente.fecha_nacimiento}</td>
                    <td>
                        <button class="btn btn-info">
                            <i class="fas fa-user-edit" onclick="editar(${paciente.id_paciente})"></i>
                        </button>
                        <button class="btn btn-danger" onclick="eliminar(${paciente.id_paciente})">
                            <i class="fas fa-user-times"></i>
                        </button>
                    </td>
                </tr>
            `;
        });

        tablaPacientes.innerHTML = html;
    })
    .catch(error => {
        // Manejar cualquier error de la solicitud
        console.error(error);
    });
}
listarPacientes();