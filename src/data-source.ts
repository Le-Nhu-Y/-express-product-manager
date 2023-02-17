import 'reflect-metadata'
import {DataSource} from "typeorm";
import Product from "./entity/Product";
export const AppDataSource = new DataSource({
    'type': "mysql",
    'host': "127.0.0.1",
    'username': "root",
    'password': "123456",
    'database': "dbTest",
    'synchronize': false,
    'logging': false,
    'migrationsRun': false,
    'entities':[Product],
    'migrations':["dist/src/migrations/*.js"]
})