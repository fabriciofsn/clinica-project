import { databaseConnection } from "@modules/database/database.connection";
import { Server } from "./server/server";

databaseConnection().then(() => console.log('connected to database'));

new Server().app.listen(3000, () =>{
  console.log('Server is running');
})
