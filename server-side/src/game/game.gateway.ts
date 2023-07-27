import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';


@WebSocketGateway(8001, )
export class GameGateway {
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }
}
