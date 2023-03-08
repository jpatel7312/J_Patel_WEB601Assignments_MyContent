import { Injectable } from '@angular/core';
import { MsgObj } from '../helper-files/msg-service-interface';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }

  messages: MsgObj[] | any = [];

  add(message: MsgObj) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }
}
