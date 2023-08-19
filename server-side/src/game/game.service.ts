import { Injectable } from "@nestjs/common";
import { Socket } from "socket.io";


interface User {
  id: string;
  gameSock: Socket;
}

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
}

interface Room {
  player1?: Socket;
  player2?: Socket;
  roomName?: string;
  isFull?: boolean;
  gameData?: GameData;
}

@Injectable()
export class GameService {
	private rooms: Room[] = [];
  private players: Socket[] = [];

	async handleConnection(client: Socket) : Promise<void> {
    for (let room of this.rooms) {
      if (room.isFull === false) {
        room.player2 = client;
        room.isFull = true;
        console.log("here 1");
        return ;
      }
    }
    await this.createRoom(client);
  }

  async createRoom(client: Socket) : Promise<void> {
    let room: Room = {
      player1: client,
      roomName: client.id,
      isFull: false,
    };

    console.log("here 2");

    await this.rooms.push(room);
  }


  async getRoomBySocketId(socketId: String) : Promise<Room> {
    
    for (let room of this.rooms) {
      if (room.player1.id === socketId || room.player2.id === socketId) {
        return room;
      }
    }

    return null;
  }

  


  

};