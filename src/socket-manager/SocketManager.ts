import { WebSocket as NodeWebSocket } from "ws";

export const MessageTypeToStringLit: MessageResponse.MessageTypeToStringLit = {
  HostState: 'HostState',
  CloseSession: 'CloseSession',
  CreateSession: 'CreateSession',
  GetSessionId: 'GetSessionId',
  SessionIdResponse: 'SessionIdResponse',
  CreateSessionResponse: 'CreateSessionResponse',
  SessionClosedResponse: 'SessionClosedResponse',
  JoinSessionResponse: 'JoinSessionResponse',
  JoinSession: 'JoinSession'
}

type IsBasicMessageFnType = <MTN extends MessageResponse.MessageTypes>(data: unknown, messageTypeName: MTN) => MessageResponse.CustomProofReturn<{messageType: MTN}>

const IsBasicMessageType: IsBasicMessageFnType = 
((data, messageTypeName) => {

  if (typeof data !== "string") {

    return {
      proofData: undefined,
      isValid: false
    }
  }

  try {
    const parsedObj = JSON.parse(data) as unknown;

    if (typeof parsedObj !== "object") {

      return {
        proofData: undefined,
        isValid: false
      };
    }

    if (parsedObj === null) {

      return {
        proofData: undefined,
        isValid: false
      };
    }

    if (!("messageType" in parsedObj)){

      return {
        proofData: undefined,
        isValid: false
      }
    }

    if (typeof parsedObj.messageType !== 'string') {

      return {
        proofData: undefined,
        isValid: false
      }
    }

    if (parsedObj.messageType !== messageTypeName) {

      return {
        proofData: undefined,
        isValid: false
      }
    }

    return {
      proofData: parsedObj,
      isValid: true
    }

  } catch {
    
    return {
      proofData: undefined,
      isValid: false
    };
  }
  
  return {
    data: undefined,
    isValid: false
  };
}) as IsBasicMessageFnType

// Move to constants or utils
const ProofMap: MessageResponse.MessageTypeToProof = {
  HostState: (data: unknown)=>{

    const baseValidation = IsBasicMessageType(data, 'HostState')

    if (!baseValidation.isValid) {

      return {
        isValid: false,
        proofData: undefined
      };
    }

    if (!("data" in baseValidation.proofData)) {

      return {
        isValid: false,
        proofData: undefined
      };
    }

    const HostStateData = baseValidation.proofData['data'];

    if (typeof HostStateData !== 'object' || HostStateData === null) {

      return {
        isValid: false,
        proofData: undefined
      };
    }

    if (!("videoTime" in HostStateData) || typeof HostStateData['videoTime'] !== 'number') {

      return {
        isValid: false,
        proofData: undefined
      };
    }

    return {
      isValid: true,
      proofData: baseValidation.proofData as MessageResponse.HostState
    };
  },
  CloseSession: (data: unknown)=>{

    const baseValidation = IsBasicMessageType(data, 'CloseSession')

    if (!baseValidation.isValid) {

      return {
        isValid: false,
        proofData: undefined
      };
    }
    
    return {
      isValid: true,
      proofData: baseValidation.proofData as MessageResponse.CloseSession
    };
  },
  CreateSession: (data: unknown)=>{

    const baseValidation = IsBasicMessageType(data, 'CreateSession')

    if (!baseValidation.isValid) {

      return {
        isValid: false,
        proofData: undefined
      };
    }

    return {
      isValid: true,
      proofData: baseValidation.proofData as MessageResponse.CreateSession
    };
  },
  GetSessionId: (data: unknown) => {

    const baseValidation = IsBasicMessageType(data, 'GetSessionId')

    if (!baseValidation.isValid) {

      return {
        isValid: false,
        proofData: undefined
      };
    }

    return {
      isValid: true,
      proofData: baseValidation.proofData as MessageResponse.GetSessionId
    };
  },
  SessionIdResponse: (data: unknown) => {

    const baseValidation = IsBasicMessageType(data, 'SessionIdResponse')

    if (!baseValidation.isValid) {

      return {
        isValid: false,
        proofData: undefined
      };
    }

    if (!("data" in baseValidation.proofData)) {

      return {
        isValid: false,
        proofData: undefined
      };
    }

    const HostStateData = baseValidation.proofData['data'];

    if (typeof HostStateData !== 'object' || HostStateData === null) {

      return {
        isValid: false,
        proofData: undefined
      };
    }

    if (!("sessionID" in HostStateData) || typeof HostStateData['sessionID'] !== 'string') {

      return {
        isValid: false,
        proofData: undefined
      };
    }

    return {
      isValid: true,
      proofData: baseValidation.proofData as MessageResponse.SessionIdResponse
    };
  },
  JoinSession: (data: unknown) => {

    const baseValidation = IsBasicMessageType(data, 'JoinSession')

    if (!baseValidation.isValid) {

      return {
        isValid: false,
        proofData: undefined
      };
    }

    if (!("data" in baseValidation.proofData)) {

      return {
        isValid: false,
        proofData: undefined
      };
    }

    const HostStateData = baseValidation.proofData['data'];

    if (typeof HostStateData !== 'object' || HostStateData === null) {

      return {
        isValid: false,
        proofData: undefined
      };
    }

    if (!("sessionID" in HostStateData) || typeof HostStateData['sessionID'] !== 'string') {

      return {
        isValid: false,
        proofData: undefined
      };
    }

    return {
      isValid: true,
      proofData: baseValidation.proofData as MessageResponse.JoinSession
    };
  },
  CreateSessionResponse: (data: unknown) => {

    const baseValidation = IsBasicMessageType(data, 'CreateSessionResponse')

    if (!baseValidation.isValid) {

      return {
        isValid: false,
        proofData: undefined
      };
    }

    if (!("data" in baseValidation.proofData)) {

      return {
        isValid: false,
        proofData: undefined
      };
    }

    const HostStateData = baseValidation.proofData['data'];

    if (typeof HostStateData !== 'object' || HostStateData === null) {

      return {
        isValid: false,
        proofData: undefined
      };
    }

    if (!("sessionID" in HostStateData) || typeof HostStateData['sessionID'] !== 'string') {

      return {
        isValid: false,
        proofData: undefined
      };
    }

    if (
      !("creationOutCome" in HostStateData) || 
      typeof HostStateData['creationOutCome'] !== 'string' || 
      !(['AlreadyHostOrMemberOfOtherSession','Successful'] satisfies MessageResponse.CreateSessionResponse['data']['creationOutCome'][] as string[]).includes(HostStateData.creationOutCome)
    ) {

      return {
        isValid: false,
        proofData: undefined
      };
    }

    return {
      isValid: true,
      proofData: baseValidation.proofData as MessageResponse.CreateSessionResponse
    };
  },
  JoinSessionResponse: (data: unknown) => {

    const baseValidation = IsBasicMessageType(data, 'JoinSessionResponse')

    if (!baseValidation.isValid) {

      return {
        isValid: false,
        proofData: undefined
      };
    }

    if (!("data" in baseValidation.proofData)) {

      return {
        isValid: false,
        proofData: undefined
      };
    }

    const HostStateData = baseValidation.proofData['data'];

    if (typeof HostStateData !== 'object' || HostStateData === null) {

      return {
        isValid: false,
        proofData: undefined
      };
    }

    if (!("sessionID" in HostStateData) || typeof HostStateData['sessionID'] !== 'string') {

      return {
        isValid: false,
        proofData: undefined
      };
    }

    if (
      !("joinOutcome" in HostStateData) || 
      typeof HostStateData['joinOutcome'] !== 'string' || 
      !(['AlreadyInOtherSession','SessionNotFound','Successful'] satisfies MessageResponse.JoinSessionResponse['data']['joinOutcome'][] as string[]).includes(HostStateData.joinOutcome)
    ) {

      return {
        isValid: false,
        proofData: undefined
      };
    }

    return {
      isValid: true,
      proofData: baseValidation.proofData as MessageResponse.JoinSessionResponse
    };
  },
  SessionClosedResponse: (data: unknown) => {

    const baseValidation = IsBasicMessageType(data, 'SessionClosedResponse')

    if (!baseValidation.isValid) {

      return {
        isValid: false,
        proofData: undefined
      };
    }

    return {
      isValid: true,
      proofData: baseValidation.proofData as MessageResponse.SessionClosedResponse
    };
  },
}

/**
 * Provides a custom class interface to simplify the network request process
 */
export class ManagedSocket {

  socket: NodeWebSocket | WebSocket | undefined;

  constructor(clientSocket: NodeWebSocket | WebSocket){

    this.socket = clientSocket;

    this.socket.addEventListener('close',()=>{
      this.socket = undefined;
    })
  }

  get isAlive() {
    
    return !!this.socket && this.socket.OPEN;
  }

  listen<TM extends MessageResponse.MessageTypes>(messageType: TM, callback:(data: MessageResponse.MessageTypeToResponse[TM])=>void ) {

    if (this.socket === undefined) {

      return;
    }

    if (this.socket instanceof WebSocket) {

      this.socket.onmessage = function(messageEvent){

        const proof = ProofMap[messageType]

        const res = proof(messageEvent.data);

        if (res.isValid){
          // Using as because type checker can't accept my proof map
          callback(res.proofData as MessageResponse.MessageTypeToResponse[TM])
        }
      }

      return;
    }

    this.socket.on('message',function(data){

        const proof = ProofMap[messageType]

        const res = proof(data.toString());

        if (res.isValid){
          // Using as because type checker can't accept my proof map
          callback(res.proofData as MessageResponse.MessageTypeToResponse[TM])
        }
      })  
  }
  
  sendMessage<TM extends MessageResponse.MessageTypes>(messageType: TM, data: MessageResponse.MessageTypeToResponse[TM]) {

    if (this.socket === undefined) {

      return;
    }

    if (data.messageType !== messageType) {

      return;
    }

    if (this.socket instanceof WebSocket) {

      this.socket.send(JSON.stringify(data))

      return;
    }

    this.socket?.send(JSON.stringify(data))
  }
}