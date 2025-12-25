declare namespace MessageResponse {

  type HostState = {
    messageType: "HostState",
    data: {
      videoTime: number
    }
  }

  type HostState2 = {
    messageType: "HostState2",
    data: string
  }
  
  type Response = HostState | HostState2;

  type MessageTypes = Response['messageType']

  type MessageTypeToResponse = {
    [key in Response as key['messageType']]: key
  }

  type MessageTypeToProof = {
    [key in Response as key['messageType']]: ((data: unknown) => [true, key] | [false, undefined])
  }

  type MessageTypeToStringLit = {
    [key in Response as key['messageType']]: key['messageType']
  }

}