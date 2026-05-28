const sequelize = require('../db/connection');
const { DataTypes } = require('sequelize');

const Maestro = sequelize.define('Maestro', {
    idMaestro: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
    },
    especialidad: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    },
    telefono: {
        type: DataTypes.STRING,
    },
    estado: {
        type: DataTypes.INTEGER,
    },
}, {
    tableName: 'Maestro',
    timestamps: false,
});

module.exports = Maestro;