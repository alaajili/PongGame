import { 
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';

import { Server, Socket } from "socket.io"

interface BallPos {
  x: number;
  y: number;
}

interface GameData {
  ballPos: BallPos;
  leftPlayerY: number;
  rightPlayerY: number;
}

@WebSocketGateway(8000, { cors: '*' })
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  server: Server

  private leftPlayer: Socket;
  private rightPlayer: Socket;
  private gameData: GameData;

  private start() {
    const newBallPos: BallPos = {x: 200, y:200};

    this.gameData.ballPos = newBallPos;
    this.gameData.leftPlayerY = 250;
    this.gameData.rightPlayerY = 250;
  }

  // handle connection of players
  handleConnection(client: Socket) {
    if (!this.leftPlayer) {
      this.leftPlayer = client;
      console.log("FIRST PLAYER HERE");
      this.start();
      this.server.emit("update", this.gameData);
    }
    else if (!this.rightPlayer) {
      this.rightPlayer = client;
    }
    else {

    }
  }

  // handle disconnection of one of the players
  handleDisconnect(client: Socket) {
    if (client === this.leftPlayer) {
      this.leftPlayer = null;
    }
    else if (client === this.rightPlayer) {
      this.rightPlayer = null;
    }
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }
}
