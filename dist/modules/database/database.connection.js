"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseConnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
require('dotenv').config();
async function databaseConnection() {
    try {
        await mongoose_1.default.connect(`mongodb+srv://fabriciodev:${process.env.DB_PASSWORD}@cluster0.skhxinx.mongodb.net/clinica`)
            .then(() => console.log('Database connected'));
    }
    catch (e) {
        console.log(`There was an error ${e}`);
    }
}
exports.databaseConnection = databaseConnection;
//# sourceMappingURL=database.connection.js.map