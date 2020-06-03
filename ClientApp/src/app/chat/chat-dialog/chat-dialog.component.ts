import { Component, OnInit } from '@angular/core';
import { ChatService, Message } from '../chat.service';
import { Observable } from 'rxjs';
import { scan } from 'rxjs/operators';
/**
* Its a Chatbot Page
*/
@Component({
  selector: 'chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.css']
})
export class ChatDialogComponent implements OnInit {
  /**
   * append to array after each new message is added to feedsource
   */
  messages: Observable<Message[]>;
  formValue: string;

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    // append to array after each new message is added to feedsource
    this.messages = this.chatService.conversation.asObservable().pipe(
      scan((acc, val) => acc.concat(val))
    );


    this.chatService.talk();
  }
  /**
   * Send Message to __DialogFlow__ 
   */
  sendMessage() {
    this.chatService.converse(this.formValue);
    //check without setTimeout
    setTimeout(() => {
      const itemToScrollTo = document.getElementById('item');
      // null check to ensure that the element actually exists
      if (itemToScrollTo) {
      itemToScrollTo.scrollIntoView(true);
      
      }

    }, 1500);

    
    this.formValue = '';
  }
}
