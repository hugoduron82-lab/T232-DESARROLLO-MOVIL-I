const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./db/connection');
const Asignatura = require('./modelos/Asignatura');
const Maestro = require('./modelos/Maestro');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// ------------------- ASIGNATURAS -------------------
app.get('/asignaturas', async (req, res) => {
    try {
        const data = await Asignatura.findAll();
        res.json({ message: 'Asignaturas obtenidas', data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/asignaturas', async (req, res) => {
    try {
        const nueva = await Asignatura.create(req.body);
        res.json({ message: 'Asignatura creada', data: nueva });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/asignaturas/:id', async (req, res) => {
    try {
        await Asignatura.update(req.body, { where: { idAsignatura: req.params.id } });
        res.json({ message: 'Asignatura actualizada' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/asignaturas/:id', async (req, res) => {
    try {
        await Asignatura.destroy({ where: { idAsignatura: req.params.id } });
        res.json({ message: 'Asignatura eliminada' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ------------------- MAESTROS -------------------
app.get('/maestros', async (req, res) => {
    try {
        const maestros = await Maestro.findAll();
        res.json({ message: 'Maestros obtenidos', data: maestros });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/maestros', async (req, res) => {
    try {
        const nuevo = await Maestro.create(req.body);
        res.json({ message: 'Maestro creado', data: nuevo });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/maestros/:id', async (req, res) => {
    try {
        await Maestro.update(req.body, { where: { idMaestro: req.params.id } });
        res.json({ message: 'Maestro actualizado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/maestros/:id', async (req, res) => {
    try {
        await Maestro.destroy({ where: { idMaestro: req.params.id } });
        res.json({ message: 'Maestro eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Servidor en http://localhost:${port}`);
    });
});