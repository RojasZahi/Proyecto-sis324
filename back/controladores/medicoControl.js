const Medico = require("../modelos/Medico");

class MedicoControl {

    async obtenerMedicos(req, res) {
        const medico = new Medico();
        const datos = await medico.obtenerMedicos();

        res.status(200).json(datos);
    }

    async obtenerUnMedico(req, res) {
        const medico = new Medico();
        const id = req.params.id; // Obtener el ID del médico desde los parámetros de la solicitud
        const datos = await medico.obtenerUnMedico(id);

        res.status(200).json(datos);
    }

    async crearMedico(req, res) {
        const { nombre, apellido, telefono, id_especialidad } = req.body; // Obtener los datos del médico desde el cuerpo de la solicitud

        const medico = new Medico(null, nombre, apellido, telefono, id_especialidad);
        const resultado = await medico.crearMedico();

        if (resultado.insertId) {
            res.status(201).json({"mensaje": "Médico creado"});
        } else {
            res.status(500).json({"mensaje": "Error al crear el médico"});
        }
    }

    async editarMedico(req, res) {
        const { id } = req.params; // Obtener el ID del médico desde los parámetros de la solicitud
        const { nombre, apellido, telefono, id_especialidad } = req.body; // Obtener los datos del médico desde el cuerpo de la solicitud

        const medico = new Medico(id, nombre, apellido, telefono, id_especialidad);
        const resultado = await medico.editarMedico(id);

        if (resultado.affectedRows) {
            res.status(201).json({"mensaje": "Médico editado"});
        } else {
            res.status(500).json({"mensaje": "Error al editar el médico"});
        }
    }

    async eliminarMedico(req, res) {
        try {
            const { id } = req.params; // Obtener el ID del médico desde los parámetros de la solicitud

            const medico = new Medico();
            const resultado = await medico.eliminarMedico(id);
            res.status(201).json({"mensaje": "Médico eliminado", "estado":"true"});
    
        } catch (error) {
            res.status(500).json({"mensaje": "No puede eliminar el médico", "estado":"false"});
        }
    }
}

module.exports = MedicoControl;
