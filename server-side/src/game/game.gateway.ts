import { 
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';

import { Server, Socket } from "socket.io"


@WebSocketGateway(8000, { cors: '*' })
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  server: Server

  private leftPlayer: Socket;
  private rightPlayer: Socket;


  handleConnection(client: Socket) {
    if (!this.leftPlayer) {
      this.leftPlayer = client;
      console.log("FIRST PLAYER HERE");
    } else if (!this.rightPlayer) {
      this.rightPlayer = client;
    } else {

    }
  }

  handleDisconnect(client: Socket) {
    
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }
}
