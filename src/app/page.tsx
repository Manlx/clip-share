"use client"
import { Button, Input } from "@Components";
import { ManagedSocket, MessageTypeToStringLit } from "@SocketManger";
import { useState } from "react";

export default function Home() {

  const [webSocket, setWebSocket] = useState<ManagedSocket | undefined>(undefined);

  const [res, setRes] = useState('')

  return (

    <div>

      <Button onClick={()=>{

        const newMWS = new ManagedSocket(new WebSocket('ws://localhost:4000'));

        setWebSocket(newMWS);

        newMWS.listen('CreateSessionResponse',(socketData)=>{

          setRes(`${socketData.data.creationOutCome}: ${socketData.data.sessionID}`)
        })

        newMWS.socket!.onopen = () => {

          newMWS.sendMessage(MessageTypeToStringLit.CreateSession,{
            messageType: MessageTypeToStringLit.CreateSession
          });
        }
      }}>Connect to WS</Button>

      <p>Res: {res}</p>
    </div>
  );
}
