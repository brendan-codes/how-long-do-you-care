import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import * as io from 'socket.io-client';
const SERVER_URL = 'http://localhost:8010';

@Injectable()
export class SocketService {

  private socket;

  constructor() { }

  initSocket() {
    this.socket = io(SERVER_URL);
  }

  send(message) {
    this.socket.emit('message', message);
  }

  onMessage() {
    return new Observable<object>(observer => {
      this.socket.on('message', (data) => observer.next(data));
    });
  }

  onEvent(event) {
    return new Observable<object>(observer => {
      this.socket.on(event, () => observer.next());
    });
  }

}
