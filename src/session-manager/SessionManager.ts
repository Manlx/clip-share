import { ManagedSocket, MessageTypeToStringLit } from "@SocketManger";
import {WebSocketServer} from "ws";

export class SessionManagerSingleton {

}

export class Session {

  Members: ManagedSocket[] = []
  
  Host: ManagedSocket | undefined
  
  AddNewMember(newMember: ManagedSocket){

    this.Members.push(newMember)
  }

  constructor(Host: ManagedSocket){

    this.Host = Host;
  }

  IsMemberOrHost(Target: ManagedSocket) {

    if (this.Host === Target){

      return true;
    }

    if (this.Members.includes(Target)){

      return true;
    }
  }
}

export class SessionManager {

  static WebSocketServer: WebSocketServer | undefined;

  static ManagedSockets: ManagedSocket[] = [];

  static Sessions: {[key: string]: Session} = {}

  static CheckIfAlreadyHostOrMemberOfAnySession(managedSocket: ManagedSocket){

    return Object.values(SessionManager.Sessions).some((currentEvalSession)=>{

      return currentEvalSession.IsMemberOrHost(managedSocket);
    })
  }

  static StartServer(){

    SessionManager.WebSocketServer = new WebSocketServer({
      port: 4000,
      autoPong: true,
    },()=>{})

    SessionManager.WebSocketServer.on('connection', (clientSocket)=>{

      const newManagedSocket = new ManagedSocket(clientSocket)
      
      SessionManager.ManagedSockets.push(newManagedSocket)

      newManagedSocket.listen('CreateSession', () =>{

        const newSessionId = crypto.randomUUID();

        SessionManager.Sessions[newSessionId] = new Session(newManagedSocket);

        newManagedSocket.sendMessage(MessageTypeToStringLit.CreateSessionResponse,{
          messageType: MessageTypeToStringLit.CreateSessionResponse,
          data: {
            sessionID: newSessionId,
            creationOutCome: 'Successful'
          }
        })
      })

      newManagedSocket.listen('JoinSession',(socketData)=>{

        if (SessionManager.CheckIfAlreadyHostOrMemberOfAnySession(newManagedSocket)){

          newManagedSocket.sendMessage('JoinSessionResponse',{
            messageType: 'JoinSessionResponse',
            data: {
              joinOutcome: 'AlreadyInOtherSession'
            }
          })

          return;
        }

        SessionManager.Sessions[socketData.data.sessionID].AddNewMember(newManagedSocket)
        newManagedSocket.sendMessage('JoinSessionResponse',{
          messageType: 'JoinSessionResponse',
          data: {
            joinOutcome: 'Successful'
          }
        })
      })

    })
  }
}