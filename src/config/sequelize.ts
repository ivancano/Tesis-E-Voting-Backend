import { Sequelize } from 'sequelize';
import "./env";

console.log(process.env)

const db = process.env.DB_DATABASE
console.log(process.env.DB_DATABASE);
const username = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD

export const sequelize = new Sequelize(db, username, password, {
  dialect: "mysql",
  port: 3306
});

sequelize.authenticate()