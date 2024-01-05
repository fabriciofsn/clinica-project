import { databaseConnection } from "@modules/database/database.connection";
import { Server } from "./server/server";

databaseConnection();

new Server().app.listen(process.env.PORT, () =>{
  console.log('Server is running');
})
