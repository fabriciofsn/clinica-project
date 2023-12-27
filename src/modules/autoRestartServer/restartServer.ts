import {exec} from 'child_process';

export class ReiniciarServidor{
  constructor(){
    this.reiniciarServer();
  }
  private reiniciarServer(): void{
    exec('npm run dev', (err: any,stdout: any, strerr: any) =>{
      if(err){
        console.error(`Houve um erro ${err}`);
        console.error(strerr);
        return
      }
      console.log(`Servidor reiniciando após error`);
    })
  }
}