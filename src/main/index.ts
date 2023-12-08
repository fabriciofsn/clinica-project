import { Server } from "./server/server";

new Server().app.listen(3000, () =>{
  console.log('Server is running');
})
