import { Component } from '@angular/core';

import { MessageService } from 'src/app/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {
  title = 'Messages Title'

  constructor(public messageService: MessageService) {}

}
