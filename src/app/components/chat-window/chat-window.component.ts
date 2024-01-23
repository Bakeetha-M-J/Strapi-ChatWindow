import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ChatService, Message } from 'src/app/service/chat.service';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit {

  messages: Message[] = [];
  value: any;
  chatFlag: boolean = false;
  chatboxFlag: boolean = false;
  openchatFlag: boolean = false;
  chatTimeOut: boolean = false;
  showPortal: boolean = false;
  pageId: any;
  time = new Date();
  registrationForm!: FormGroup;
  submitted = false;
  constructor(public chatService: ChatService,
    public fb: FormBuilder) {


  }

  ngOnInit() {
    this.pageId = localStorage.getItem('pageId');
    // Send the first initial message
    const initialMessage1 = new Message('bot', 'One moment as we connect you to a Representative.');
    this.messages = this.messages.concat([initialMessage1]);
    this.chatService.conversation.next([initialMessage1]);

    // Send the second initial message after a delay
    setTimeout(() => {
      const initialMessage2 = new Message('bot', 'Hello, thank you for your inquiry. Unfortunately, our live Talent Acquisition team member is currently unavailable. A member of our team will get back to you as soon as possible within the next 24 hours. Thank you!');
      this.messages = this.messages.concat([initialMessage2]);
      // this.chatService.conversation.next([initialMessage2]);
    }, 5000);

    // Subscribe to further messages
    this.chatService.conversation.subscribe((val: any) => {
      console.log('messages', this.messages, val);
      this.messages = this.messages.concat(val);
      console.log('messages-concat', this.messages);
      this.chatService.addMessage(this.messages);
    });


    // Subscribe to the allmessages$ observable to get updates
    this.chatService.allmessages$.subscribe((messages) => {
      console.log('Received messages in chat-window:', messages);
      // Do something with the messages in the chat window
    });


    //   Observable.interval(1000).subscribe((x) => {
    //     this.chatTimeOut = true;
    // });

    // this.chatService.conversation.subscribe((val: any) => {
    //   console.log('messages', this.messages, val);
    //   this.messages = this.messages.concat(val);
    //   console.log('messages-concat', this.messages);
    // });

    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      smsOption: ['', Validators.required],
      description: ['', Validators.required]
    });

  }
  get f() { return this.registrationForm.controls; }

  openChatBot() {
    this.chatFlag = !this.chatFlag;
    this.chatboxFlag = false;
  }

  sendMessage() {
    this.chatService.getBotAnswer(this.value);
    this.value = '';
    this.chatService.addMessage(this.messages);
  }

  // sendMessage(message: string): void {
  //   this.chatService.addMessage(message);
  // }

  startChat(chatId: string) {
    console.log(chatId);
    this.chatboxFlag = !this.chatboxFlag;
    this.chatFlag = false;

  }
  closeChat() {
    this.chatFlag = false;
    this.chatTimeOut = false;
    this.openchatFlag = false;
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registrationForm.valid) {
      // return;
      this.openchatFlag = !this.openchatFlag;
      this.chatboxFlag = false;
    }

    setTimeout(() => {
      this.chatTimeOut = true;
      this.chatFlag = false;
      this.chatboxFlag = false;
      this.openchatFlag = false;
    }, 5000000);
  }

  // openWindow(event: Event): void {
  //   this.showPortal =true;
  //   window.open(document.getElementById('chatbox')?.innerHTML || '', '_blank', 'width=600,height=400,left=200,top=200')
  //   // window.open(document.URL, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');
  // }

  openWindow(event: Event): void {
    this.showPortal = true;
    // Assuming this.messages is an array of messages you want to pass
  const messages = this.messages;

    const newWindow = window.open('', '/new-window', 'width=410,height=530,left=0,top=0');
    if (newWindow) {
      // Communicate the messages to the new window
      console.log('Messages to be sent:', messages);
      newWindow.postMessage({ messages }, '*');

      newWindow.location.href = '/new-window'; // Navigate to the route for the new component
    } else {
      console.error('Failed to open the new window.');
    }
  }
    // window.open(document.getElementById('chatbox')?.innerHTML, '_blank', 'width=600,height=400,left=200,top=200');
    // const chatboxContent = document.getElementById('chatbox')?.innerHTML;

    // if (chatboxContent) {
    //   const newWindow = window.open('', '_blank', 'width=600,height=400,left=200,top=200');

    //   if (newWindow) {
    //     newWindow.document.write('<html><head>');
    //     newWindow.document.write('<link rel="stylesheet" type="text/css" href="http://localhost:4200/src/app/components/chat-window/chat-window.component.css">');
    //     newWindow.document.write('</head><body>');
    //     newWindow.document.write(chatboxContent);
    //     newWindow.document.write('</body></html>');
    //     newWindow.document.close();
    //   } else {
    //     console.error('Failed to open the new window.');
    //   }
    // }




  // openWindow(event: Event): void {
  //   this.showPortal = true;
  //   const windowFeatures = 'width=600,height=400,left=200,top=200';
  //   const newWindow = window.open('', '_blank', windowFeatures);

  //   if (newWindow) {
  //     newWindow.document.write('<html><head>');

  //     // Include your stylesheets or styles here
  //     newWindow.document.write('<link rel="stylesheet" type="text/css" href="src/app/components/chat-window/chat-window.component.css">');

  //     newWindow.document.write('<title>Chat Box Window</title></head><body>');
  //     newWindow.document.write(document.getElementById('chatbox')?.outerHTML || '');
  //     newWindow.document.write('</body></html>');
  //     newWindow.document.close();
  //   } else {
  //     // Handle popup blocked or other issues
  //     console.error('Failed to open the new window.');
  //   }
  // }




}
