const Database = require("./Database");

class Paciente {
    constructor(id_paciente, nombre, apellido, telefono, direccion, fecha_nacimiento) {
        this.id_paciente = id_paciente;
        this.nombre = nombre;
        this.apellido = apellido;
        this.telefono = telefono;
        this.direccion = direccion;
        this.fecha_nacimiento = fecha_nacimiento;
    }

    async obtenerPacientes() {
        const database = new Database();
        database.connect();
        let sql = "select * from pacientes";
        const resultado = await database.query(sql);
        database.close();

        return resultado;
    }

    async obtenerUnPaciente(id) {
        const database = new Database();
        database.connect();
        let sql = "SELECT * FROM pacientes WHERE id_paciente = ?";
        const resultado = await database.query(sql, [id]);
        database.close();

        return resultado[0];
    }

    async crearPaciente() {
        const database = new Database();
        database.connect();
        let sql = "INSERT INTO pacientes (nombre, apellido, telefono, direccion, fecha_nacimiento) VALUES (?, ?, ?, ?, ?)";
        const resultado = await database.query(sql, [this.nombre, this.apellido, this.telefono, this.direccion, this.fecha_nacimiento]);
        database.close();

        return resultado;
    }

    async editarPaciente(id) {
        const database = new Database();
        database.connect();
        let sql = "UPDATE pacientes SET nombre = ?, apellido = ?, telefono = ?, direccion = ?, fecha_nacimiento = ? WHERE id_paciente = ?";
        const resultado = await database.query(sql, [this.nombre, this.apellido, this.telefono, this.direccion, this.fecha_nacimiento, id]);
        database.close();

        return resultado;
    }

    async eliminarPaciente(id) {
        const database = new Database();
        database.connect();
        let sql = "DELETE FROM pacientes WHERE id_paciente = ?";
        const resultado = await database.query(sql, [id]);
        database.close();

        return resultado;
    }

}

module.exports = Paciente;