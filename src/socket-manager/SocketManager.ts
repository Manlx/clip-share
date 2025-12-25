import { type WebSocket } from "ws";

const MessageTypeToStringLit: MessageResponse.MessageTypeToStringLit = {
  HostState: 'HostState',
  HostState2: 'HostState2'
}

const IsObjectAble: (data: unknown) => data is object = (data: unknown): data is object => {

  if (typeof data !== 'string') {

    return false;
  }

  try {
    
    const res = JSON.parse(data);

    return typeof res === 'object';

  } catch (error) {
    
    return false;
  }
}

// Move to constants or utils
const ProofMap: MessageResponse.MessageTypeToProof = {
  HostState: (data: unknown)=>{

    if (!IsObjectAble(data)) {

      return [false, undefined];
    }

    if (typeof data !== 'string') {

      return [false, undefined];
    }

    const serializedData = JSON.parse(data) as unknown;

    if (typeof serializedData !== "object") {
      
      return [false, undefined];
    }

    if (serializedData === null) {

      return [false, undefined];
    }

    if (!("messageType" in serializedData) || serializedData['messageType'] !== MessageTypeToStringLit.HostState) {

      return [false, undefined];
    }

    if (!("data" in serializedData)) {

      return [false, undefined];
    }

    const HostStateData = serializedData['data'];

    if (typeof HostStateData !== 'object' || HostStateData === null) {

      return [false, undefined];
    }

    if (!("videoTime" in HostStateData) || typeof HostStateData['videoTime'] !== 'number') {

      return [false, undefined];
    }

    return [true,serializedData as MessageResponse.HostState];
  },
  HostState2: () => {
    return [false, undefined]
  }
}

/**
 * Provides a custom class interface to simplify the network request process
 */
export class ManagedSocket {

  socket: WebSocket | undefined;

  constructor(clientSocket: WebSocket){

    this.socket = clientSocket;

    this.socket.on('close',()=>{
      this.socket = undefined;
    })
  }

  get isAlive() {
    
    return !!this.socket && this.socket.OPEN;
  }

  listen<TM extends MessageResponse.MessageTypes>(messageType: TM, callback:(data: MessageResponse.MessageTypeToResponse[TM])=>void ) {

    this.socket?.on('message',function(data){

      const proof = ProofMap[messageType]
      
      const res = proof(data);

      if (res[0]){
        // Using as because type checker can't accept my proof map
        callback(res[1] as MessageResponse.MessageTypeToResponse[TM])
      }
    })

  }
  
  async RequestCurrentState(): Promise<MessageResponse.HostState>{
  
    return {
      data: {
        videoTime: 0
      },
      messageType: 'HostState'
    }
  }
}