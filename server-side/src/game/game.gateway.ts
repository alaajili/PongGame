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
  leftScore?: number;
  rightScore?: number;
  speedX?: number;
  speedY?: number;
}

interface User {
  id: String;
  userSocket: Socket;
}

interface Room {
  players?: Socket[];
  roomName?: string;
  data?: GameData;
}

@WebSocketGateway(8000, { cors: '*' })
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  server: Server;

  private queue: Socket[] = [];
  private rooms: Room[] = [];

  private roomNames: String[] = [];


  // handle connection of players
  async handleConnection(client: Socket) : Promise<void> {
    
    await this.queue.push(client);
    client.emit("joined_queue");

    if (this.queue.length >= 2) {
      const players = this.queue.splice(0, 2);
      const roomName: string = this.createNewRoom();

      players.forEach(player => {
        player.join(roomName);
      });

      let room: Room = {roomName: roomName,
                        players: players,
                        data: {
                          ballPos: {x: 500, y:300},
                          speedX: 3,
                          speedY: 2,
                          leftPlayerY: 250, rightPlayerY: 250
                        }};
      
      this.rooms.push(room);
      this.server.to(room.roomName).emit("started");
    }
    

  }

  private createNewRoom() : string {


    let roomName: string;
    
    do {
      roomName = Math.random().toString(36).substring(7);
    } while (this.roomNames.includes(roomName));
    
    this.roomNames.push(roomName);

    return roomName;

  }

  // handle disconnection of one of the players
  handleDisconnect(client: Socket) {
    
  }

  @Interval(10)
  async moveBall() {
    for (let room of this.rooms) {
      room.data.ballPos.x += room.data.speedX;
      room.data.ballPos.y += room.data.speedY;

      if (room.data.ballPos.y >= 595 || room.data.ballPos.y <= 5) {
        room.data.speedY *= -1;
      }
      if (room.data.ballPos.x >= 995 || room.data.ballPos.x <= 5) {
        room.data.speedX *= -1;
      }
      this.server.to(room.roomName).emit("update", room.data);
    }

  }


  // @SubscribeMessage("move")
  // movePaddle(@MessageBody() data: any) {
  //   if (data.direction === "down" && data.side === "left" && this.gameData.leftPlayerY < 520) {
  //     this.gameData.leftPlayerY += 10;
  //   }
  //   else if (data.direction === "down" && data.side === "right" && this.gameData.rightPlayerY < 520) {
  //     this.gameData.rightPlayerY += 10;
  //   }
  //   else if (data.direction === "up" && data.side === "left" && this.gameData.leftPlayerY > 0) {
  //     this.gameData.leftPlayerY -= 10;
  //   }
  //   else if (data.direction === "up" && data.side === "right" && this.gameData.rightPlayerY > 0) {
  //     this.gameData.rightPlayerY -= 10;
  //   }

  //   this.server.emit("update", this.gameData );
  // }

  
}
