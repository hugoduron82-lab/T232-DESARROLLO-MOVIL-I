const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    'graficos',   
    'root',               
    'ZoeVic12052021',           
    {
        host: 'localhost',
        port: 3306,
        dialect: 'mysql',
    }
);

sequelize.authenticate()
    .then(() => console.log('Conexión exitosa a la BD'))
    .catch(err => console.error('Error de conexión:', err));

module.exports = sequelize;