import { Sequelize } from "sequelize";

//Conexão com o banco de dados
const sequelize = new Sequelize('biblioteca2025', 'postgres', '20052003', {
    host: 'localhost',
    port: 5432,
    dialect:'postgres',
    define: {
        timestamps: false,
        freezeTableName: true
    }
});

export default sequelize;