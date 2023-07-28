import { Interval } from '@nestjs/schedule';
import { 
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';


import { Server, Socket } from "socket.io"

interface BallPos {
  x?: number;
  y?: number;
}

interface GameData {
  ballPos?: BallPos;
  leftPlayerY?: number;
  // rightPlayerY: number;
}

@WebSocketGateway(8000, { cors: '*' })
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  server: Server;

  private leftPlayer: Socket;
  private rightPlayer: Socket;
  private gameData: GameData;

  constructor() {
    this.gameData = {}
    this.gameData.ballPos = {}
  }

  private start() {
    
    this.gameData = {
      leftPlayerY: 250,
      ballPos: { x: 50, y:50 }
    };

  }

  // handle connection of players
  handleConnection(client: Socket) {
    if (!this.leftPlayer) {
      this.leftPlayer = client;
      console.log("FIRST PLAYER HERE");
      this.start();
      this.server.emit("update", this.gameData );
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

  @Interval(20)
  handleBall() {
    this.gameData.ballPos.y += 4;
    this.gameData.ballPos.x += 4;
    this.server.emit("update", this.gameData );
  }

  
}
