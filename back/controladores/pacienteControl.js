const Paciente = require('../modelos/Paciente');


class PacienteControl {

    async obtenerPacientes(req, res) {
        const paciente = new Paciente();
        const datos = await paciente.obtenerPacientes();

        res.status(200).json(datos);
    }

    async obtenerUnPaciente(req, res) {
        const paciente = new Paciente();
        const id = req.params.id; // Obtener el ID del paciente desde los parámetros de la solicitud
        const datos = await paciente.obtenerUnPaciente(id);

        res.status(200).json(datos);
    }

    async crearPaciente(req, res) {
        const { nombre, apellido, telefono, direccion, fecha_nacimiento } = req.body; // Obtener los datos del paciente desde el cuerpo de la solicitud

        const paciente = new Paciente(null, nombre, apellido, telefono, direccion, fecha_nacimiento);
        const resultado = await paciente.crearPaciente();

        if (resultado.insertId) {
            res.status(201).json({"mensaje": "Paciente creado"});
        } else {
            res.status(500).json({"mensaje": "Error al crear el paciente"});
        }
    }

    async editarPaciente(req, res) {
        const { id } = req.params; // Obtener el ID del paciente desde los parámetros de la solicitud
        const { nombre, apellido, telefono, direccion, fecha_nacimiento } = req.body; // Obtener los datos del paciente desde el cuerpo de la solicitud

        const paciente = new Paciente(id, nombre, apellido, telefono, direccion, fecha_nacimiento);
        const resultado = await paciente.editarPaciente(id);

        if (resultado.affectedRows) {
            res.status(201).json({"mensaje": "Paciente editado"});
        } else {
            res.status(500).json({"mensaje": "Error al editar el paciente"});
        }
    }

    async eliminarPaciente(req, res) {
        try {
            const { id } = req.params; // Obtener el ID del paciente desde los parámetros de la solicitud
            console.log(id)

            const paciente = new Paciente();
            const resultado = await paciente.eliminarPaciente(id);
            res.status(201).json({"mensaje": "Paciente eliminado", "estado":"true"});

    
        } catch (error) {
            res.status(500).json({"mensaje": "NO puede eliminar al paciente", "estado":"false"});
        }
    }
}

module.exports = PacienteControl;