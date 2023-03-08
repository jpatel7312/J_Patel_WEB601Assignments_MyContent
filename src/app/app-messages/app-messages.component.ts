import { Component } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-app-messages',
  templateUrl: './app-messages.component.html',
  styleUrls: ['./app-messages.component.css']
})
export class AppMessagesComponent {

  constructor(public msgService:MessageService){

  }

}
