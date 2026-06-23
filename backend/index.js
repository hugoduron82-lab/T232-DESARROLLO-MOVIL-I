const express = require('express');
const cors = require('cors');
const Producto = require('./modelos/Producto');

const app = express();
app.use(cors());
app.use(express.json());

// GET /productos - listar todos
app.get('/productos', async (req, res) => {
    try {
        const productos = await Producto.findAll();
        if (productos.length > 0) {
            res.status(200).json({ message: 'OK', data: productos });
        } else {
            res.status(404).json({ message: 'No hay productos' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error', error: error.message });
    }
});


// POST /productos - crear
app.post('/productos', async (req, res) => {
    try {
        const nuevo = await Producto.create(req.body);
        res.status(201).json({ message: 'Creado', data: nuevo });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear', error: error.message });
    }
});

// DELETE /productos/:id - eliminar
app.delete('/productos/:id', async (req, res) => {
    try {
        const eliminados = await Producto.destroy({
            where: { partNumber: req.params.id },
        });
        if (eliminados > 0) {
            res.status(200).json({ message: 'Eliminado' });
        } else {
            res.status(404).json({ message: 'No encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar', error: error.message });
    }
});


const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));