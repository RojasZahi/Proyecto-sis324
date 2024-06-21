const Database = require("./Database");

class Pago {
    constructor(id_pago, id_consulta, fecha_pago, monto, id_paciente, nombre_paciente) {
        this.id_pago = id_pago;
        this.id_consulta = id_consulta;
        this.fecha_pago = fecha_pago;
        this.monto = monto;
        this.id_paciente = id_paciente;
        this.nombre_paciente = nombre_paciente;
    }

    async obtenerPagos() {
        const database = new Database();
        database.connect();
        let sql = "SELECT * FROM pagos";
    
        const resultado = await database.query(sql);
        database.close();

        return resultado;
    }

    async obtenerUnPago(id) {
        const database = new Database();
        database.connect();
        let sql = "SELECT * FROM pagos WHERE id_pago = ?";
        const resultado = await database.query(sql, [id]);
        database.close();

        return resultado[0];
    }

    async crearPago() {
        const database = new Database();
        database.connect();
        let sql = "INSERT INTO pagos (id_pago, id_consulta, fecha_pago, monto, id_paciente, nombre_paciente) VALUES (?, ?, ?, ?, ?, ?)";
        const resultado = await database.query(sql, [this.id_pago, this.id_consulta, this.fecha_pago, this.monto, this.id_paciente, this.nombre_paciente]);
        database.close();

        return resultado;
    }

    async editarPago(id) {
        const database = new Database();
        database.connect();
        let sql = "UPDATE pagos SET id_consulta = ?, fecha_pago = ?, monto = ?, id_paciente = ?, nombre_paciente = ? WHERE id_pago = ?";
        const resultado = await database.query(sql, [this.id_consulta, this.fecha_pago, this.monto, this.id_paciente, this.nombre_paciente, id]);
        database.close();

        return resultado;
    }

    async eliminarPago(id) {
        const database = new Database();
        database.connect();
        let sql = "DELETE FROM pagos WHERE id_pago = ?";
        const resultado = await database.query(sql, [id]);
        database.close();

        return resultado;
    }
}

module.exports = Pago;
