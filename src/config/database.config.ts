import { Sequelize } from "sequelize";
import path from "path";
const database = new Sequelize({
    dialect: "sqlite",
    storage: path.join(__dirname, "../", "database", "store.sqlite"),
 });

export default database;