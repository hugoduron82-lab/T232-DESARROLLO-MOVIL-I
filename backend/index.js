const express = require('express');
const cors = require('cors');
const Producto = require('./modelos/Producto');

const app = express();
app.use(cors());
app.use(express.json());

// --- GET /productos ---
app.get('/productos', async (req, res) => {
  try {
    const productos = await Producto.findAll();
    res.json({ message: 'OK', data: productos });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- POST /productos ---
app.post('/productos', async (req, res) => {
  try {
    const nuevo = await Producto.create(req.body);
    res.status(201).json({ message: 'Creado', data: nuevo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.delete('/items/:id', async (req, res) => {
  try {
    const eliminados = await Producto.destroy({
      where: { partNumber: req.params.id },
    });
    if (eliminados > 0) {
      res.json({ message: 'Eliminado' });
    } else {
      res.status(404).json({ message: 'No encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


const PORT = 5001;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));