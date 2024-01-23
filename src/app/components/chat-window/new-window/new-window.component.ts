import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Message, ChatService } from 'src/app/service/chat.service';

@Component({
  selector: 'app-new-window',
  templateUrl: './new-window.component.html',
  styleUrls: ['./new-window.component.css']
})
export class NewWindowComponent implements OnInit {

  messages: Message[] = [];
  value: any;
  chatFlag: boolean = false;
  chatboxFlag: boolean = false;
  openchatFlag: boolean = false;
  chatTimeOut: boolean = false;
  showPortal: boolean = false;
  time = new Date();
  registrationForm!: FormGroup;
  submitted = false;
  constructor(public chatService: ChatService,
    public fb: FormBuilder) {


  }

  ngOnInit() {
    window.addEventListener('message', (event) => {
      const { messages } = event.data;

      console.log('Received messages in new-chat-window message111:', messages);
    });


    this.chatService.allmessages$.subscribe((messages) => {
      console.log('Received messages in new-chat-window:', messages);
    });


    this.registrationForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      smsOption: ['', Validators.required],
      description: ['']
    });

  }

  ngAfterViewInit() {
    // Listen for messages from the main window
    window.addEventListener('message', (event) => {
      const { messages } = event.data;

      // Do something with the messages in the new window
      console.log('Received messages in the new window:', messages);
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
  }

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
    }, 50000000);
  }


  openWindow(event: Event): void {
    //   this.showPortal = true;
    //   window.open(document.getElementById('chatbox')?.innerHTML, '_blank', 'width=400,height=600,left=0,top=0');
  }

}
