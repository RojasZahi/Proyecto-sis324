const Pago = require('../modelos/Pago');

class PagoControl {

    async obtenerPagos(req, res) {
        const pago = new Pago();
        const datos = await pago.obtenerPagos();

        res.status(200).json(datos);
    }

    async obtenerUnPago(req, res) {
        const pago = new Pago();
        const id = req.params.id; // Obtener el ID del pago desde los parámetros de la solicitud
        const datos = await pago.obtenerUnPago(id);

        res.status(200).json(datos);
    }

    async crearPago(req, res) {
        const { id_pago	,  id_consulta,	fecha_pago	, monto	,id_pacient,  nombre_paciente } = req.body; // Obtener los datos del pago desde el cuerpo de la solicitud

        const pago = new Pago( id_pago	,  id_consulta,	fecha_pago	, monto	,id_pacient,  nombre_paciente);
        const resultado = await pago.crearPago();

        if (resultado.insertId) {
            res.status(201).json({"mensaje": "Pago creado"});
        } else {
            res.status(500).json({"mensaje": "Error al crear el pago"});
        }
    }

    async editarPago(req, res) {
        const { id } = req.params; // Obtener el ID del pago desde los parámetros de la solicitud
        const { nombre_especialidad, monto, fecha_pago, nombre_paciente } = req.body; // Obtener los datos del pago desde el cuerpo de la solicitud

        const pago = new Pago(id, nombre_especialidad, monto, fecha_pago, nombre_paciente);
        const resultado = await pago.editarPago(id);

        if (resultado.affectedRows) {
            res.status(201).json({"mensaje": "Pago editado"});
        } else {
            res.status(500).json({"mensaje": "Error al editar el pago"});
        }
    }

    async eliminarPago(req, res) {
        try {
            const { id } = req.params; // Obtener el ID del pago desde los parámetros de la solicitud

            const pago = new Pago();
            const resultado = await pago.eliminarPago(id);
            res.status(201).json({"mensaje": "Pago eliminado", "estado":"true"});
    
        } catch (error) {
            res.status(500).json({"mensaje": "No se puede eliminar el pago", "estado":"false"});
        }
    }
}

module.exports = PagoControl;
