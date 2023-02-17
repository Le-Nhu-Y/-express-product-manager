"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Product_1 = __importDefault(require("./entity/Product"));
exports.AppDataSource = new typeorm_1.DataSource({
    'type': "mysql",
    'host': "127.0.0.1",
    'username': "root",
    'password': "123456",
    'database': "dbTest",
    'synchronize': false,
    'logging': false,
    'migrationsRun': false,
    'entities': [Product_1.default],
    'migrations': ["dist/src/migrations/*.js"]
});
//# sourceMappingURL=data-source.js.map