const sequelize = require('../db/connection');
const { DataTypes } = require('sequelize');

const Producto = sequelize.define('Producto', {
    partNumber: {
        type: DataTypes.STRING(50),
        primaryKey: true,
    },
    productType: DataTypes.STRING(50),
    categoryCode: DataTypes.STRING(50),
    brandCode: DataTypes.STRING(50),
    familyCode: DataTypes.STRING(50),
    lineCode: DataTypes.STRING(50),
    productSegmentCode: DataTypes.STRING(50),
    status: {
        type: DataTypes.STRING(20),
        defaultValue: 'Disponible',
    },
    value: DataTypes.DECIMAL(10, 2),
    valueCurrency: {
        type: DataTypes.STRING(10),
        defaultValue: 'USD',
    },
    defaultQuantityUnits: DataTypes.STRING(20),
    name: DataTypes.STRING(100),
    description: DataTypes.TEXT,
    plannerCode: DataTypes.STRING(50),
    sourceLink: DataTypes.STRING(255),
}, {
    tableName: 'product_v6',
    timestamps: false,
});

module.exports = Producto;