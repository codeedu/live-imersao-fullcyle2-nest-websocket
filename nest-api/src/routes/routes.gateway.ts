import {
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
@WebSocketGateway()
export class RoutesGateway implements OnGatewayConnection {
  private users = {};

  @WebSocketServer()
  public server: Server;

  handleConnection(client: Socket, ...args: any[]) {
    this.users[client.id] = { name: 'luiz carlos', email: 'luiz@email.com' };
    console.log(this.users);
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any): void {
    client.emit('receive-message', payload);
    //this.server.sockets.connected[c.id].emit(payload);
    client.broadcast.emit('receive-message', payload);
  }

  // @SubscribeMessage('new-direction')
  // handleNewDirection(client: Socket, payload: { routeId: string }): void {
  //   this.kafkaProducer.send('route.new-direction', {
  //     routeId: payload.routeId,
  //     clientId: client.id
  //   });
  // }
}

//client -> http handshake -> servidor
//conexão estabelecida -> servidor é gerado um ID

//escalonar - instancia do servidor | redis

//Verbos disponíveis para cada endpoint
//Quais headers http da requisição estão autorizados a serem passadas
//Quais headers estão habilitados numa resposta 
//Quais endereços estão autorizados a acessarem a minha API

