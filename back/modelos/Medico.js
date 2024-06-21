const Database = require("./Database");

class Medico {
    constructor(id_medico, nombre, apellido, telefono, id_especialidad) {
        this.id_medico = id_medico;
        this.nombre = nombre;
        this.apellido = apellido;
        this.telefono = telefono;
        this.id_especialidad = id_especialidad;
    }

    async obtenerMedicos() {
        const database = new Database();
        database.connect();
        let sql = "SELECT * FROM medicos"; // Utilizar "medicos" aquí
        const resultado = await database.query(sql);
        database.close();

        return resultado;
    }

    async obtenerUnMedico(id) {
        const database = new Database();
        database.connect();
        let sql = "SELECT * FROM medicos WHERE id_medico = ?";
        const resultado = await database.query(sql, [id]);
        database.close();

        return resultado[0];
    }

    async crearMedico() {
        const database = new Database();
        database.connect();
        let sql = "INSERT INTO medicos (nombre, apellido, telefono, id_especialidad) VALUES (?, ?, ?, ?)";
        const resultado = await database.query(sql, [this.nombre, this.apellido, this.telefono, this.id_especialidad]);
        database.close();

        return resultado;
    }

    async editarMedico(id) {
        const database = new Database();
        database.connect();
        let sql = "UPDATE medicos SET nombre = ?, apellido = ?, telefono = ?, id_especialidad = ? WHERE id_medico = ?";
        const resultado = await database.query(sql, [this.nombre, this.apellido, this.telefono, this.id_especialidad, id]);
        database.close();

        return resultado;
    }

    async eliminarMedico(id) {
        const database = new Database();
        database.connect();
        let sql = "DELETE FROM medicos WHERE id_medico = ?";
        const resultado = await database.query(sql, [id]);
        database.close();

        return resultado;
    }
}

module.exports = Medico;
