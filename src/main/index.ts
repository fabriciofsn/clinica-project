import { databaseConnection } from "@modules/database/database.connection";
import { Server } from "./server/server";

databaseConnection();

new Server().app.listen(3000, () =>{
  console.log('Server is running');
})
