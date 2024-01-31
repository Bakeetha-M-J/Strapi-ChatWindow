import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

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


  private sharedData: Subject<any> = new Subject<any>();
  sharedData$: Observable<any> = this.sharedData.asObservable();


  constructor() { }
  conversation = new Subject<Message[]>();

  messageMap:any = {
    "Hi": "Hello",
    "hi": "Hello",
    "Site": "Trinity Solar site",
    "site": "Trinity Solar site",
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

  }
  getaddMessage(){
    console.log('get addMessage',this.allmessages);
    return this.allmessages;
  }

  setAllMessages(allmessages: any) {
    this.allmessages$ = allmessages;
   }
   getAllMessages() {
    console.log('getAllMessages',this.allmessages$);
    return this.allmessages$;
   }

   setData(updatedData: any) {
    this.sharedData.next(updatedData);

  }
  // allMessages(): Observable<any>{
  //   return this.allmessages$
  // }
}
