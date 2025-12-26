import { ManagedSocket, MessageTypeToStringLit } from "@SocketManger";
import {WebSocketServer} from "ws";

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

export class SessionManagerSingleton {

  static WebSocketServer: WebSocketServer | undefined;

  static ManagedSockets: ManagedSocket[] = [];

  static Sessions: {[key: string]: Session} = {}

  static CheckIfAlreadyHostOrMemberOfAnySession(managedSocket: ManagedSocket){

    return Object.values(SessionManagerSingleton.Sessions).some((currentEvalSession)=>{

      return currentEvalSession.IsMemberOrHost(managedSocket);
    })
  }

  static StartServer(){

    SessionManagerSingleton.WebSocketServer = new WebSocketServer({
      port: 4000,
      autoPong: true,
    },()=>{
      console.log("listening on ws://localhost:4000")
    })

    SessionManagerSingleton.WebSocketServer.on('connection', (clientSocket)=>{

      const newManagedSocket = new ManagedSocket(clientSocket)
      
      SessionManagerSingleton.ManagedSockets.push(newManagedSocket)

      newManagedSocket.listen(MessageTypeToStringLit.CreateSession, () =>{

        if (SessionManagerSingleton.CheckIfAlreadyHostOrMemberOfAnySession(newManagedSocket)){

            newManagedSocket.sendMessage(MessageTypeToStringLit.CreateSessionResponse,{
            messageType: MessageTypeToStringLit.CreateSessionResponse,
            data: {
              sessionID: '',
              creationOutCome: 'AlreadyHostOrMemberOfOtherSession'
            }
          })
        }

        const newSessionId = crypto.randomUUID();

        SessionManagerSingleton.Sessions[newSessionId] = new Session(newManagedSocket);

        newManagedSocket.sendMessage(MessageTypeToStringLit.CreateSessionResponse,{
          messageType: MessageTypeToStringLit.CreateSessionResponse,
          data: {
            sessionID: newSessionId,
            creationOutCome: 'Successful'
          }
        })
      })

      newManagedSocket.listen(MessageTypeToStringLit.JoinSession,(socketData)=>{

        if (SessionManagerSingleton.CheckIfAlreadyHostOrMemberOfAnySession(newManagedSocket)){

          newManagedSocket.sendMessage(MessageTypeToStringLit.JoinSessionResponse,{
            messageType: MessageTypeToStringLit.JoinSessionResponse,
            data: {
              joinOutcome: 'AlreadyInOtherSession'
            }
          })

          return;
        }

        SessionManagerSingleton.Sessions[socketData.data.sessionID].AddNewMember(newManagedSocket)
        newManagedSocket.sendMessage(MessageTypeToStringLit.JoinSessionResponse,{
          messageType: MessageTypeToStringLit.JoinSessionResponse,
          data: {
            joinOutcome: 'Successful'
          }
        })
      })

    })
  }
}