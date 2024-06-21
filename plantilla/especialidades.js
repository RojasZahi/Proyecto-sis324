$("#frmNuevaEspecialidad").submit(function (e) {
    e.preventDefault();
    let data = {
        "id_especialidad": $("#id_especialidad").val(),
        "nombre_especialidad": $("#nombre_especialidad").val(),
    };

    fetch('http://127.0.0.1:5000/especialidades', {
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

        listarEspecialidades();
        cancelar();
    });
});

function cancelar() {
    $("#cardTablaEspecialidad").show();
    $("#cardFrmCrearEspecialidad").hide();
}

function editarEspecialidad(id_especialidad) {
    $("#cardTablaEspecialidad").hide();
    $("#cardFrmEditarEspecialidad").show();

    fetch('http://127.0.0.1:5000/especialidades/' + id_especialidad)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        $("#id_especialidadEd").val(id_especialidad); // Asegúrate de establecer el valor del campo oculto id_especialidadEd
        $("#nombreEspecialidadEd").val(data.nombre_especialidad);
    });
}

function crearEspecialidad() {
    $("#cardTablaEspecialidad").hide();
    $("#cardFrmCrearEspecialidad").show();
}

$("#frmEditarEspecialidad").submit(function (e) {
    e.preventDefault();
    let id = $("#id_especialidadEd").val();
    let data = {
        id,
        "nombre_especialidad": $("#nombreEspecialidadEd").val(),
    };

    console.log(data)

    fetch('http://127.0.0.1:5000/especialidades/' + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: data.mensaje,
            showConfirmButton: false,
            timer: 1500
        });

        listarEspecialidades();
        cancelar2();
    });
});

function cancelar2() {
    $("#id_especialidadEd").val("");
    $("#cardTablaEspecialidad").show();
    $("#cardFrmEditarEspecialidad").hide();
}

function eliminarEspecialidad(id_especialidad) {
    Swal.fire({
        title: "Seguro en eliminar la especialidad",
        text: "No podra revertir esta acción",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Eliminar"
    }).then((result) => {
        if (result.isConfirmed) {
            fetch('http://127.0.0.1:5000/especialidades/' + id_especialidad, {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(data => {
                if (data.estado == "true") {
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

                listarEspecialidades();
            });
        }
    });
}

function listarEspecialidades() {
    fetch('http://127.0.0.1:5000/especialidades')
    .then(response => response.json())
    .then(data => {
        let tablaEspecialidades = document.getElementById("listaEspecialidades");
        let html = '';
        let numero = 1;
        data.forEach(especialidad => {
            html += `
                <tr>
                    <td>${numero++}</td>
                    <td>${especialidad.nombre_especialidad}</td>
                    <td>
                        <button class="btn btn-info">
                            <i class="fas fa-edit" onclick="editarEspecialidad(${especialidad.id_especialidad})"></i>
                        </button>
                        <button class="btn btn-danger" onclick="eliminarEspecialidad(${especialidad.id_especialidad})">
                            <i class="fas fa-times"></i>
                        </button>
                    </td>
                </tr>
            `;
        });

        tablaEspecialidades.innerHTML = html;
    })
    .catch(error => {
        // Manejar cualquier error de la solicitud
        console.error(error);
    });
}

listarEspecialidades();
