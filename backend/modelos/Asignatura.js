const sequelize = require('../db/connection');
const { DataTypes } = require('sequelize');

const Asignatura = sequelize.define('Asignatura', {
    idAsignatura: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
    },
    cantidadhoras: {
        type: DataTypes.INTEGER,
    },
    estado: {
        type: DataTypes.INTEGER,
    },
}, {
    tableName: 'Asignatura',
    timestamps: false,
});

module.exports = Asignatura;