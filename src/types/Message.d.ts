declare namespace MessageResponse {

  type MessageTypeConstant = 'messageType'

  type HostState = {
    messageType: "HostState",
    data: {
      videoTime: number
    }
  }

  type CreateSession = {
    messageType: "CreateSession"
  }

  type CreateSessionResponse = {
    messageType: "CreateSessionResponse",
    data: {
      sessionID: string,
      creationOutCome: 'Successful' | 'AlreadyHostOrMemberOfOtherSession'
    }
  }

  type CloseSession = {
    messageType: "CloseSession"
  }

  type SessionClosedResponse = {
    messageType: "SessionClosedResponse"
  }

  type JoinSession = {
    messageType: "JoinSession",
    data: {
      sessionID: string
    }
  }
  
  type JoinSessionResponse = {
    messageType: 'JoinSessionResponse',
    data:{
      joinOutcome: 'Successful' | 'AlreadyInOtherSession' | 'SessionNotFound'
    }
  }

  type GetSessionId = {
    messageType: "GetSessionId",
  }

  type SessionIdResponse = {
    messageType: "SessionIdResponse",
    data: {
      sessionID: string
    }
  }
  
  type Response = HostState | CreateSession | CreateSessionResponse | CloseSession | SessionClosedResponse | JoinSession | JoinSessionResponse | GetSessionId | SessionIdResponse;

  type MessageTypes = Response[MessageTypeConstant]

  type MessageTypeToResponse = {
    [key in Response as key[MessageTypeConstant]]: key
  }

  type CustomProofReturn<DataType> = {isValid: false, proofData: undefined} | {isValid: true, proofData: DataType}

  type MessageTypeToProof = {
    [key in Response as key[MessageTypeConstant]]: ((data: unknown) => CustomProofReturn<Pick<key,MessageTypeConstant>>)
  }

  type MessageTypeToStringLit = {
    [key in Response as key[MessageTypeConstant]]: key[MessageTypeConstant]
  }

}