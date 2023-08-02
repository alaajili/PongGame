import { Interval } from '@nestjs/schedule';
import { 
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
  MessageBody
} from '@nestjs/websockets';


import { Server, Socket } from "socket.io"

interface BallPos {
  x?: number;
  y?: number;
}

interface GameData {
  ballPos?: BallPos;
  leftPlayerY?: number;
  rightPlayerY?: number;
}

@WebSocketGateway(8000, { cors: '*' })
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  server: Server;

  private leftPlayer: Socket;
  private rightPlayer: Socket;
  private gameData: GameData;

  private speedY = 3;
  private speedX = 3;

  constructor() {
    this.gameData = {}
    this.gameData.ballPos = {}
  }
 
  private start() {
    
    this.gameData = {
      leftPlayerY: 250,
      rightPlayerY: 250,
      ballPos: { x: 50, y:50 }
    };

  }

  // handle connection of players
  handleConnection(client: Socket) {
    if (!this.leftPlayer) {
      this.leftPlayer = client;
      console.log("FIRST PLAYER HERE");
      client.emit("side", 0);
    }
    else if (!this.rightPlayer) {
      this.rightPlayer = client;
      console.log("SECOND PLAYER HERE");
      client.emit("side", 1);
      this.start();
      this.server.emit("update", this.gameData);
    }
    else {
      client._onclose("forced close");
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

  // @Interval(10)
  // moveBall() {
  //   this.gameData.ballPos.y += this.speedY;
  //   this.gameData.ballPos.x += this.speedX;

  //   this.server.emit("update", this.gameData );

  //   if (this.gameData.ballPos.y <= 5 || this.gameData.ballPos.y >= 595) { this.speedY *= -1; }
  //   if (this.gameData.ballPos.x <= 5 || this.gameData.ballPos.x >= 995) { this.speedX *= -1; }

  // }


  @SubscribeMessage("move")
  movePaddle(@MessageBody() data: any) {
    if (data.direction === "down" && data.side === "left") {
      this.gameData.leftPlayerY += 10;
    }
    else if (data.direction === "down" && data.side === "right") {
      this.gameData.rightPlayerY += 10;
    }
    else if (data.direction === "up" && data.side === "left") {
      this.gameData.leftPlayerY -= 10;
    }
    else if (data.direction === "up" && data.side === "right") {
      this.gameData.rightPlayerY -= 10;
    }
    this.server.emit("update", this.gameData );
  }

  
}
