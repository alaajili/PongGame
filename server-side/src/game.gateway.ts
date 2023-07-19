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

    connectedUsers: Set<string> = new Set();

    handleConnection(client: Socket) {
        console.log(`Client connected: ${client.id}`);
        this.connectedUsers.add(client.id);
    }
    handleDisconnect(client: Socket) {
        console.log(`Client disconnected: ${client.id}`);
        this.connectedUsers.delete(client.id);
    }
    
    @SubscribeMessage('move')
    handleMove(client: Socket, data: any) {
        this.server.emit('update', {})
    }
    

}