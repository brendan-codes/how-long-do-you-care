import { Component } from '@angular/core';
import { SocketService } from './socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})




export class AppComponent {
  title = 'app';
  messages = [];
  ioConnection: any;
  io;
  timer = 0;

  time = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    centiseconds: 0
  };

  stringTime = {
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
    centiseconds: '00'
  };

  timeoutHandler;

  constructor(private socket: SocketService) {
    this.initToConnection();
  }

  private initToConnection() {
    this.socket.initSocket();

    this.ioConnection = this.socket.onMessage().subscribe((message) => {
      this.messages.push(message);
    });

    this.socket.onEvent('connect').subscribe(() => {
      console.log('You are connected!');
    });

    this.socket.onEvent('other:connection').subscribe(() => {
      console.log('Somebody else connected!');
    });

    this.socket.onEvent('disconnect').subscribe(() => {
      console.log('Somebody disconnected!');
    });

  }

  // public sendButton() {
  //   this.socket.send({
  //     message: 'Testing!'
  //   });
  // }

  public mouseu() {
    if (this.timeoutHandler) {
      clearInterval(this.timeoutHandler);
      this.timeoutHandler = null;
    }
  }

  public moused() {
    this.timer = 0;
    this.timeoutHandler = setInterval(() => {
      console.log('test');
      this.timer += 1;
      this.time = this.returnTimeDisplay(this.timer);
      this.stringTime = this.numToStringTime(this.time);
      this.socket.send({
        message: 'Sending successful!'
      });
    }, 10);
  }

  public returnTimeDisplay(n) {

    const map = {
       day: Number('8.64e6'),
       hour: 360000,
       minute: 6000,
       second: 100
    };

    const object = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      centiseconds: 0
    };

    object.days = Math.floor(n / map.day);
    n = n % map.day;
    console.log(n);
    object.hours = Math.floor(n / map.hour);
    n = n % map.hour;
    object.minutes = Math.floor(n / map.minute);
    n = n % map.minute;
    object.seconds = Math.floor(n / map.second);
    n = n % map.second;
    object.centiseconds = Math.floor(n);

    return object;
  }

  public numToStringTime(time) {

    const output = {
      days: String(time.days),
      hours: String(time.hours),
      minutes: String(time.minutes),
      seconds: String(time.seconds),
      centiseconds: String(time.centiseconds)
    };

    if (time.days < 10) {
      output.days = '0' + String(time.days);
    }
    if (time.hours < 10) {
      output.hours = '0' + String(time.hours);
    }
    if (time.minutes < 10) {
      output.minutes = '0' + String(time.minutes);
    }
    if (time.seconds < 10) {
      output.seconds = '0' + String(time.seconds);
    }
    if (time.centiseconds < 10) {
      output.centiseconds = '0' + String(time.centiseconds);
    }

    return output;
  }

    // If you require the number as a string simply cast back as so



}
