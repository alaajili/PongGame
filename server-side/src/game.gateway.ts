import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {


    @WebSocketServer()
    server: Server;

    private player1: Socket;
    private player2: Socket;

    private player2Y: number;
    private player1Y: number;

    handleConnection(client: Socket) {
        if (!this.player1) {
            this.player1 = client;
            this.player1Y = 10;
        } else if (!this.player2) {
            this.player2 = client;
            this.startGame();
        } else {
            // Handle additional players or reject connection
        }
    }

    handleDisconnect(client: Socket) {
        if (this.player1 === client) {
            this.player1 = null;
            this.broadcast("player1 left", null);
        }
        else if (this.player2 === client) {
            this.player2 = null;
            this.broadcast("player2 left", null);
        }
        
    }
    
    private startGame() {
        this.player1Y = 10;
        this.player2Y = 10;
    }

    private broadcast(event: string, data: any) {
        this.server.emit(event, data);
    }    

    @SubscribeMessage('enter')
    handleMove(client: Socket) {
        if (client === this.player1)
            this.player1Y += 10;
        this.server.emit("update", { player1Y: this.player1Y });
    }
    

}