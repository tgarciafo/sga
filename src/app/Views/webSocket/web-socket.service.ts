import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Subject, Observer, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService extends Socket {

  constructor() {
    super({
      url:''
    })
   }
}
