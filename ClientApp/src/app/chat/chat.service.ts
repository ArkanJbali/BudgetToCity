import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ApiAiClient } from 'api-ai-javascript/es6/ApiAiClient';
import { Observable, BehaviorSubject } from 'rxjs';
import { formatDate } from '@angular/common';

export class Message {
  constructor(public content: string, public sentBy: string, public timeMsg: string) {}
}
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  userTimeSendMessage;
  readonly token = environment.dialogflow.budgetToCityBot;
  readonly client = new ApiAiClient({ accessToken: this.token });
  conversation = new BehaviorSubject<Message[]>([]);

  constructor() { }
  // Adds message to source
  update(msg: Message) {
    this.conversation.next([msg]);
  }

  //Sends and recieves messages via DialogFlow
  converse(msg: string) {
    this.userTimeSendMessage = formatDate(new Date(), 'HH:mm:ss a', 'en-US');
    const userMessage = new Message(msg, 'User', this.userTimeSendMessage);
    this.update(userMessage);

    return this.client.textRequest(msg).then(res => {
      const botTimeSendMessage = formatDate(res.timestamp, 'HH:mm:ss a', 'en-US');
      const speech = res.result.fulfillment.speech;
      const botMessage = new Message(speech, 'Bot', botTimeSendMessage);
      this.update(botMessage);

    });
  }
  talk() {
    this.client.textRequest('Who are you!').
      then(res => {
        this.userTimeSendMessage = formatDate(new Date(), 'HH:mm:ss a', 'en-US');
        const speech = res.result.fulfillment.speech;
        const botMessage = new Message(speech, 'Bot', this.userTimeSendMessage);
        this.update(botMessage);
      });
  }
}
