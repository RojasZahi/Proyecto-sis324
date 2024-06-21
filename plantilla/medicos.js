
$("#frmNuevoMedico").submit(function (e) { 
    e.preventDefault();
    let data = {
        "nombre": $("#nombreMedico").val(),
        "apellido": $("#apellidoMedico").val(),
        "telefono": $("#telefonoMedico").val(),
       
    }

    fetch('http://127.0.0.1:5000/medicos', {
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

        listarMedicos();
        cancelarMedico();
    })
    .catch(error => {
        console.error(error);
    });
});

function agregarMedico() {
    $("#cardTablaMedicos").hide();
    $("#cardFrmCrearMedico").show();
}

function cancelarMedico() {
    $("#cardTablaMedicos").show();
    $("#cardFrmCrearMedico").hide();
}

function editarMedico(id_medico) {
    $("#cardTablaMedicos").hide();
    $("#cardFrmEditarMedico").show();

    fetch('http://127.0.0.1:5000/medicos/' + id_medico)
    .then(response => response.json())
    .then(data => {
        $("#idMedico").val(id_medico);
        $("#nombreMedicoEd").val(data.nombre);
        $("#apellidoMedicoEd").val(data.apellido);
        $("#telefonoMedicoEd").val(data.telefono);
      
        // Agrega otros campos según tus necesidades
    })
}

$("#frmEditarMedico").submit(function (e) { 
    e.preventDefault();
    let id = $("#idMedico").val();
    let data = {
        "nombre": $("#nombreMedicoEd").val(),
        "apellido": $("#apellidoMedicoEd").val(),
        "telefono": $("#telefonoMedicoEd").val(),
      
        // Agrega otros campos según tus necesidades
    }

    fetch('http://127.0.0.1:5000/medicos/' + id, {
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

        listarMedicos();
        cancelarMedico2();
    });
});

function cancelarMedico2() {
    $("#idMedico").val("");
    $("#cardTablaMedicos").show();
    $("#cardFrmEditarMedico").hide();
}

function eliminarMedico(id_medico) {
    Swal.fire({
        title: "Seguro en eliminar el médico",
        text: "No podrá revertir esta acción",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Eliminar"
    }).then((result) => {
        if (result.isConfirmed) {
            fetch('http://127.0.0.1:5000/medicos/' + id_medico, {
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

                listarMedicos();
            })
        }
    });
}

function listarMedicos() {
    fetch('http://127.0.0.1:5000/medicos')
    .then(response => response.json())
    .then(data => {
        let tablaMedicos = document.getElementById("listaMedicos");
        let html = '';
        let numero = 1;
        data.forEach(medico => {
            html += `
                <tr>
                    <td>${numero++}</td>
                    <td>${medico.nombre}</td>
                    <td>${medico.apellido}</td>
                    <td>${medico.telefono}</td>
                  
                    <!-- Agrega otros campos según tus necesidades -->
                    <td>
                        <button class="btn btn-info">
                            <i class="fas fa-user-edit" onclick="editarMedico(${medico.id_medico})"></i>
                        </button>
                        <button class="btn btn-danger" onclick="eliminarMedico(${medico.id_medico})">
                            <i class="fas fa-user-times"></i>
                        </button>
                    </td>
                </tr>
            `;
        });

        tablaMedicos.innerHTML = html;
    })
    .catch(error => {
        console.error(error);
    });
}

listarMedicos();
