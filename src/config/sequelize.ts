import { Sequelize } from 'sequelize';
import "./env";

console.log(process.env)

const db = process.env.DB_DATABASE
console.log(process.env.DB_PASSWORD);
const username = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD

export const sequelize = new Sequelize(db, username, password, {
  dialect: "mysql",
  port: Number(process.env.DB_PORT) || 3306,
  host: process.env.DB_HOST
});

sequelize.authenticate()