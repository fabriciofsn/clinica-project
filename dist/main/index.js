"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_connection_1 = require("@modules/database/database.connection");
const server_1 = require("./server/server");
(0, database_connection_1.databaseConnection)().then(() => console.log('connected to database'));
new server_1.Server().app.listen(3000, () => {
    console.log('Server is running');
});
//# sourceMappingURL=index.js.map