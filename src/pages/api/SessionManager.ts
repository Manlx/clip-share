import { SessionManagerSingleton } from '@SessionManager'
import type { NextApiRequest, NextApiResponse } from 'next'
 
type ResponseData = {
  message: string
}

if (!SessionManagerSingleton.WebSocketServer){

  SessionManagerSingleton.StartServer();
}
else {

  SessionManagerSingleton.WebSocketServer.close();
  SessionManagerSingleton.WebSocketServer.once('close',()=>{

    SessionManagerSingleton.WebSocketServer = undefined;
    SessionManagerSingleton.StartServer();
  })

}
 
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {

  switch (req.method) {
    case "GET": {

      res.status(200).json({ message: 'Hello from session manager' })
    }break;

  }

  res.status(200).json({ message: 'Hello from Next.js!' })
}