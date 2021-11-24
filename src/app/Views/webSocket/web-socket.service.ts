import { Injectable, EventEmitter, Output } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService extends Socket {

  @Output() clientEven: EventEmitter<any> = new EventEmitter();
  @Output() producteEven: EventEmitter<any> = new EventEmitter();
  @Output() entradaEven: EventEmitter<any> = new EventEmitter();
  @Output() sortidaEven: EventEmitter<any> = new EventEmitter();
  @Output() bloquejarEven: EventEmitter<any> = new EventEmitter();
  @Output() planificarEven: EventEmitter<any> = new EventEmitter();

  constructor() {
    super({
      url:'http://localhost:5000',
      options: {
        query: {
          namePage: 'xxxx'
        },
      }
    })
    this.listenClient();
    this.listenProduct();
    this.listenEntrada();
    this.listenSortida();
    this.listenBloquejar();
    this.listenPlanificar();
  }

  listenClient = () => {
    this.ioSocket.on('client', (res: any) => this.clientEven.emit(res));   
  }

  listenProduct = () => {
    this.ioSocket.on('producte', (res: any) => this.producteEven.emit(res));   

  }

  listenEntrada = () => {
    this.ioSocket.on('entrada', (res: any) => this.entradaEven.emit(res));   

  }

  listenSortida = () => {
    this.ioSocket.on('sortida', (res: any) => this.sortidaEven.emit(res));   

  }

  listenBloquejar = () => {
    this.ioSocket.on('bloquejar', (res: any) => this.bloquejarEven.emit(res));   

  }

  listenPlanificar = () => {
    this.ioSocket.on('planificar', (res: any) => this.planificarEven.emit(res));
  }

  clientEvent = ( payload = {}) => {
    this.ioSocket.emit('client', payload)
  }

  producteEvent = ( payload = {}) => {
    this.ioSocket.emit('producte', payload)
  }

  entradaEvent = ( payload = {}) => {
    this.ioSocket.emit('entrada', payload)
  }

  sortidaEvent = ( payload = {}) => {
    this.ioSocket.emit('sortida', payload)
  }

  bloquejarEvent = ( payload = {}) => {
    this.ioSocket.emit('bloquejar', payload)
  }

  planificarEvent = ( payload = {}) => {
    this.ioSocket.emit('planificar', payload)
  }
}
