import { Sequelize } from 'sequelize'

const db = process.env.DB_DATABASE
const username = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD

export const sequelize = new Sequelize(db, username, password, {
  dialect: "mysql",
  port: 3306,
  host: process.env.DB_HOST
});

sequelize.authenticate()