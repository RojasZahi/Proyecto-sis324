const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

const PacienteControl = require("./controladores/pacienteControl");
const pacienteCtr = new PacienteControl();

const PagoControl = require("./controladores/pagoControl");
const pagoCtr = new PagoControl();


const MedicoControl = require('./controladores/medicoControl');
const medicoCtr = new MedicoControl();

const EspecialidadControl = require('./controladores/especialidadControl');
const especialidadCtr = new EspecialidadControl();

app.use(cors());
app.use(bodyParser.json());

// Rutas para Especialidades
app.get('/especialidades', especialidadCtr.obtenerEspecialidades);
app.get('/especialidades/:id', especialidadCtr.obtenerUnaEspecialidad);
app.post('/especialidades', especialidadCtr.crearEspecialidad);
app.put('/especialidades/:id', especialidadCtr.editarEspecialidad);
app.delete('/especialidades/:id', especialidadCtr.eliminarEspecialidad);

app.get('/pacientes', pacienteCtr.obtenerPacientes);
app.get('/pacientes/:id', pacienteCtr.obtenerUnPaciente);
app.post('/pacientes/', pacienteCtr.crearPaciente);
app.put('/pacientes/:id', pacienteCtr.editarPaciente);
app.delete('/pacientes/:id', pacienteCtr.eliminarPaciente);

// Suponiendo que `medicoCtr` es tu controlador para médicos
app.get('/medicos', medicoCtr.obtenerMedicos);
app.get('/medicos/:id', medicoCtr.obtenerUnMedico);
app.post('/medicos', medicoCtr.crearMedico);
app.put('/medicos/:id', medicoCtr.editarMedico);
app.delete('/medicos/:id', medicoCtr.eliminarMedico);

app.get('/pagos', pagoCtr.obtenerPagos);
app.get('/pagos/:id', pagoCtr.obtenerUnPago);
app.post('/pagos', pagoCtr.crearPago);
app.put('/pagos/:id', pagoCtr.crearPago);
app.delete('/pagos/:id', pagoCtr.editarPago);

let port = 5000;

app.listen(port, () => {
    console.log(`Servidor corriendo en: http://localhost:${port}`);
});
