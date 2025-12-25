import {WebSocketServer} from "ws";

export class SessionManagerSingleton {

}

export class Session {

  Members: WebSocket[] = []
  
  Host: WebSocket | undefined
  
  AddNewMember(){

  }

  constructor(){

    const server = new WebSocketServer();

    server.on('connection',(ws)=>{

    })
  }
}

export class SessionManager {

  static WebSocketServer: WebSocketServer | undefined;

  static StartServer(){

    this.WebSocketServer = new WebSocketServer({
      port: 4000,
      autoPong: true,
    },()=>{})

    this.WebSocketServer.on('connection', (clientSocket)=>{
      
    })
  }
}