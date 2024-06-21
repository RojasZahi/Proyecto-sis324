const Especialidad = require("../modelos/Especialidad");

class EspecialidadControl {

    async obtenerEspecialidades(req, res) {
        const especialidad = new Especialidad();
        const datos = await especialidad.obtenerEspecialidades();

        res.status(200).json(datos);
    }

    async obtenerUnaEspecialidad(req, res) {
        const especialidad = new Especialidad();
        const id = req.params.id; // Obtener el ID de la especialidad desde los parámetros de la solicitud
        const datos = await especialidad.obtenerUnaEspecialidad(id);

        res.status(200).json(datos);
    }

    async crearEspecialidad(req, res) {
        const { nombre_especialidad } = req.body; // Obtener los datos de la especialidad desde el cuerpo de la solicitud

        const especialidad = new Especialidad(null, nombre_especialidad);
        const resultado = await especialidad.crearEspecialidad();

        if (resultado.insertId) {
            res.status(201).json({"mensaje": "Especialidad creada"});
        } else {
            res.status(500).json({"mensaje": "Error al crear la especialidad"});
        }
    }

    async editarEspecialidad(req, res) {
        const { id } = req.params; // Obtener el ID de la especialidad desde los parámetros de la solicitud
        const { nombre_especialidad } = req.body; // Obtener los datos de la especialidad desde el cuerpo de la solicitud

        const especialidad = new Especialidad(id, nombre_especialidad);
        const resultado = await especialidad.editarEspecialidad(id);

        if (resultado.affectedRows) {
            res.status(201).json({"mensaje": "Especialidad editada"});
        } else {
            res.status(500).json({"mensaje": "Error al editar la especialidad"});
        }
    }

    async eliminarEspecialidad(req, res) {
        try {
            const { id } = req.params; // Obtener el ID de la especialidad desde los parámetros de la solicitud

            const especialidad = new Especialidad();
            const resultado = await especialidad.eliminarEspecialidad(id);
            res.status(201).json({"mensaje": "Especialidad eliminada", "estado": "true"});
    
        } catch (error) {
            res.status(500).json({"mensaje": "No se puede eliminar la especialidad", "estado": "false"});
        }
    }
}

module.exports = EspecialidadControl;
