import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

export class Message {
  constructor(public author: string, public content: string) {}
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private allmessages = new BehaviorSubject<string[]>([]);
  messages$ = this.allmessages.asObservable();

  public allmessages$ = this.allmessages.asObservable();
  constructor() { }
  conversation = new Subject<Message[]>();

  messageMap:any = {
    "Hi": "Hello",
    "Site": "Trinity Solar site",
    "default": "I can't understand. Can you please repeat"
  }

  getBotAnswer(msg: string) {
    const userMessage = new Message('user', msg);
    this.conversation.next([userMessage]);
    const botMessage = new Message('bot', this.getBotMessage(msg));
    // console.log('allmessages:',this.allmessages);
    setTimeout(()=>{
      this.conversation.next([botMessage]);
    }, 1500);
  }

  getBotMessage(question: string){
    let answer = this.messageMap[question];
    console.log('answer:',answer);
    return answer || this.messageMap['default'];
  }

  addMessage(message: any) {
    const currentMessages = this.allmessages.value;
    const newMessages = [...currentMessages, message];
    this.allmessages.next(newMessages);
    console.log('answer addMessage:', this.allmessages, this.allmessages$);
    return this.allmessages;
  }
}
