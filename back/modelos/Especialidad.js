const Database = require("./Database");

class Especialidad {
    constructor(id_especialidad, nombre_especialidad) {
        this.id_especialidad = id_especialidad;
        this.nombre_especialidad = nombre_especialidad;
    }

    async obtenerEspecialidades() {
        const database = new Database();
        database.connect();
        let sql = "SELECT * FROM especialidades";
        const resultado = await database.query(sql);
        database.close();

        return resultado;
    }

    async obtenerUnaEspecialidad(id) {
        const database = new Database();
        database.connect();
        let sql = "SELECT * FROM especialidades WHERE id_especialidad = ?";
        const resultado = await database.query(sql, [id]);
        database.close();

        return resultado[0];
    }

    async crearEspecialidad() {
        const database = new Database();
        database.connect();
        let sql = "INSERT INTO especialidades (id_especialidad,nombre_especialidad) VALUES (?)";
        const resultado = await database.query(sql, [this.nombre]);
        database.close();

        return resultado;
    }

    async editarEspecialidad(id) {
        const database = new Database();
        database.connect();
        let sql = "UPDATE especialidades SET nombre_especialidad = ? WHERE id_especialidad = ?";
        const resultado = await database.query(sql, [this.nombre_especialidad, id]);
        database.close();

        return resultado;
    }

    async eliminarEspecialidad(id) {
        const database = new Database();
        database.connect();
        let sql = "DELETE FROM especialidades WHERE id_especialidad = ?";
        const resultado = await database.query(sql, [id]);
        database.close();

        return resultado;
    }
}

module.exports = Especialidad;
