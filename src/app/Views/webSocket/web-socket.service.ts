import { Injectable, EventEmitter, Output } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService extends Socket {

  @Output() outEven: EventEmitter<any> = new EventEmitter();
  @Output() producteEven: EventEmitter<any> = new EventEmitter();
  @Output() entradaEven: EventEmitter<any> = new EventEmitter();

  constructor() {
    super({
      url:'http://localhost:5000',
      options: {
        query: {
          namePage: 'xxxx'
        },
      }
    })
    this.listen();
    this.listenProduct();
    this.listenEntrada();
  }

  listen = () => {
    this.ioSocket.on('evento', (res: any) => this.outEven.emit(res));   
  }

  listenProduct = () => {
    this.ioSocket.on('producte', (res: any) => this.producteEven.emit(res));   

  }

  listenEntrada = () => {
    this.ioSocket.on('entrada', (res: any) => this.entradaEven.emit(res));   

  }

  emitEvent = ( payload = {}) => {
    this.ioSocket.emit('evento', payload)
  }

  producteEvent = ( payload = {}) => {
    this.ioSocket.emit('producte', payload)
  }

  entradaEvent = ( payload = {}) => {
    this.ioSocket.emit('entrada', payload)
  }

}
