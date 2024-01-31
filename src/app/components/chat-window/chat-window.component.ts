import { ChangeDetectionStrategy, Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ChatService, Message } from 'src/app/service/chat.service';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css'],
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
    }, 1000);

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

  // Delay adding the event listener
  setTimeout(() => {
    window.addEventListener('message', (event) => {
      // Handle messages received from the child window
      console.log('Message received in parent:', event.data);
      this.receivedMessage = event.data;

      if (event.origin === window.location.origin) {
        console.log('Received chat flag:', this.openchatFlag, this.showPortal);
        // Do something with the data, e.g., update UI
        this.showPortal = false;
        this.openchatFlag = true;
        const arrayLen = event.data.length-1;
        const receivedData = event.data;
        console.log('Received data in parent check:', receivedData, arrayLen);
        this.messages = receivedData[arrayLen];
      }

    });


  }, 1000); // Adjust the delay as needed


  // Add event listener for messages from child
  // window.addEventListener('message', (event) => {
  //   if (event.origin === window.location.origin) {
  //     const receivedData = event.data.data;
  //     console.log('Received data in parent:', receivedData);
  //     this.messages = receivedData;
  //   }
  // });

    //   Observable.interval(1000).subscribe((x) => {
    //     this.chatTimeOut = true;
    // });

    // this.chatService.conversation.subscribe((val: any) => {
    //   console.log('messages', this.messages, val);
    //   this.messages = this.messages.concat(val);
    //   console.log('messages-concat', this.messages);
    // });

    this.registrationForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      lastName: ['', Validators.required],
      email: ['',[Validators.required, Validators.email]],
      mobileNumber: ['', [Validators.required,
        Validators.pattern(/^(?:\+\d{1,2}\s?)?(?:\(\d{3}\)|\d{3})(?:[-.\s]?)\d{3}(?:[-.\s]?)\d{4}$/)]],
      smsOption: ['', Validators.required],
      description: ['', Validators.required]
    });

  }

  // ngAfterViewInit() {
  //   // Listen for messages from the child window
  //   window.addEventListener('message', (event) => {
  //     // Handle messages received from the child window
  //     if (event.origin === window.location.origin) {
  //       const receivedData = event.data.data;
  //       console.log('Received data in parent:', receivedData);
  //       this.showPortal = false;
  //       this.openchatFlag = true;
  //       // Process the received data (add it to your messages array, for example)
  //       this.messages = receivedData;
  //     }
  //   });
  // }
  get f() { return this.registrationForm.controls; }

  openChatBot() {

    this.chatFlag = !this.chatFlag;
    this.chatboxFlag = false;

  }


  // sendMessage(message: string): void {
  //   this.chatService.addMessage(message);
  // }

  initChat(){
      // Send the first initial message
      const initialMessage1 = new Message('bot', 'One moment as we connect you to a Representative.');
      // this.messages = this.messages.concat([initialMessage1]);
      // this.chatService.conversation.next([initialMessage1]);
      this.messages.push(initialMessage1);
      // Send the second initial message after a delay
      // setTimeout(() => {
        const initialMessage2 = new Message('bot', 'Hello, thank you for your inquiry. Unfortunately, our live Talent Acquisition team member is currently unavailable. A member of our team will get back to you as soon as possible within the next 24 hours. Thank you!');
        // this.messages = this.messages.concat([initialMessage2]);
        // this.chatService.conversation.next([initialMessage2]);
        this.messages.push(initialMessage2);
      // }, 1000);

      // Subscribe to further messages
      // this.chatService.conversation.subscribe((val: any) => {
      //   console.log('messages', this.messages, val);
      //   this.messages = this.messages.concat(val);
      //   console.log('messages-concat', this.messages);
      //   this.chatService.addMessage(this.messages);
      // });


      // // Subscribe to the allmessages$ observable to get updates
      // this.chatService.allmessages$.subscribe((messages) => {
      //   console.log('Received messages in chat-window:', messages);
      //   // Do something with the messages in the chat window
      // });

    // Delay adding the event listener
    setTimeout(() => {
      window.addEventListener('message', (event) => {
        // Handle messages received from the child window
        console.log('Message received in parent:', event.data);
        this.receivedMessage = event.data;

        if (event.origin === window.location.origin) {
          console.log('Received chat flag:', this.openchatFlag, this.showPortal);
          // Do something with the data, e.g., update UI
          this.showPortal = false;
          this.openchatFlag = true;
          const arrayLen = event.data.length-1;
          const receivedData = event.data;
          console.log('Received data in parent check:', receivedData, arrayLen);
          this.messages = receivedData[arrayLen];
        }

      });


    }, 1000); // Adjust the delay as needed

  }

  startChat(chatId: string) {
    console.log(chatId);
    this.chatboxFlag = !this.chatboxFlag;
    this.chatFlag = false;

  }
  closeChat() {
    this.chatFlag = false;
    this.chatboxFlag = false;
    this.openchatFlag = false;
    this.chatTimeOut = false;
    this.showPortal = false;
    this.submitted = false;

    //  console.log('Before reset', this.registrationForm.value);
      this.registrationForm.reset();
    //  console.log('After reset', this.registrationForm.value);
     // Reset the messages array
     this.messages = [];
     this.initChat();
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
    }, 1000000);
  }

  // openWindow(event: Event): void {
  //   this.showPortal =true;
  //   window.open(document.getElementById('chatbox')?.innerHTML || '', '_blank', 'width=600,height=400,left=200,top=200')
  //   // window.open(document.URL, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');
  // }
  //   goToDetailsByService(anime: Message) {
  //     this.chatService.setAllMessages(anime);
  //     //this.router.navigateByUrl('/details');
  //     window.open('/details');
  //  }

  newWindow: any;
  openWindow(): void {
    this.showPortal = true;

    const messages = this.messages;

    this.newWindow = window.open('', '/new-window', 'width=410,height=530,left=0,top=0');

    if (this.newWindow) {
      // Set up a specific event listener for the new window
      const messageListener = (event: any) => {
        console.log('Message received in parent:', event);
        // Handle messages received from the new tab
      };
      this.newWindow.addEventListener('message', messageListener);

      // Communicate the messages to the new window
      this.chatService.setAllMessages(messages);
      console.log('Messages to be sent:', messages);

      setTimeout(() => {
        this.newWindow.postMessage({ data: messages }, window.location.origin);
      }, 1000); // Adjust the delay as needed

      this.chatService.setData(messages);
      localStorage.setItem("messages", JSON.stringify(messages));

      this.newWindow.location.href = '/new-window'; // Navigate to the route for the new component
    } else {
      console.error('Failed to open the new window.');
    }
  }


  // openWindow() {
  //   // Send messages to the new window
  //   const messages = this.messages;
  //   const newWindow = window.open('', '/new-window', 'width=410,height=530,left=0,top=0');

  //   if (newWindow) {
  //     // Set up a specific event listener for the new window
  //     const messageListener = (event: any) => {
  //       console.log('Message received in parent:', event);
  //       // Handle messages received from the new tab
  //     };
  //     newWindow.addEventListener('message', messageListener);

  //     // Communicate the messages to the new window
  //     newWindow.postMessage({ data: messages }, window.location.origin);
  //   } else {
  //     console.error('Failed to open the new window.');
  //   }
  // }

  sendMessage() {

      if (this.value.trim() !== '') {
        // Assuming getBotAnswer adds a user message to the conversation
        this.chatService.getBotAnswer(this.value);
        this.value = '';
      }

  }


  chatMovetoParentWindow() {
    this.showPortal = false;
    this.openchatFlag = true;

    // const storedMessages = JSON.parse(localStorage.getItem("messages") || '[]');
    // console.log('storedMessages', storedMessages);
    // this.messages = storedMessages;
    // localStorage.removeItem("messages");
    window.addEventListener('message', (event) => {
      // Handle messages received from the parent window
      console.log('Message received in child:', event.data);
      if (event.origin === window.location.origin) {
        // Do something with the data, e.g., update UI
        const receivedData = event.data.data;
        console.log('Received data in child:', receivedData);
        this.messages = receivedData;
      }
    });
    // Close the popout chat window
    if (this.newWindow) {
      this.newWindow.close();
    }
  }



  postmessage: string = '';
  receivedMessage:any;

  sendPostMessage(): void {
    // const childWindow = window.open('/new-window', '_blank', 'width=410,height=530,left=0,top=0');
    // window.opener.postMessage(this.messageText, '*');
    // childWindow?.opener.postMessage(this.message, '*');

    const messages = this.postmessage;
    this.newWindow = window.open('', '/new-window', 'width=410,height=530,left=0,top=0');
    if (this.newWindow) {
      // Set up a specific event listener for the new window
      const messageListener = (event: any) => {
        console.log('Message received in parent:', event);
        // Handle messages received from the new tab
      };
      this.newWindow.addEventListener('message', messageListener);

      setTimeout(() => {
        this.newWindow.postMessage({ data: messages }, window.location.origin);
      }, 1000); // Adjust the delay as needed
      this.newWindow.location.href = '/new-window'; // Navigate to the route for the new component
    } else {
      console.error('Failed to open the new window.');
    }
  }



}























  // openWindow(event: Event): void {
  //   console.log('openWindow', event);
  //   this.showPortal = true;
  //   // Assuming this.messages is an array of messages you want to pass
  //   const messages = this.messages;

  //   const newWindow = window.open('', '/new-window', 'width=410,height=530,left=0,top=0');
  //   // Listen for messages from the new tab
  //   window.addEventListener('message', (event) => {
  //     // Handle messages received from the new tab

  //     console.log('Message received in parent:', event);
  //   });

  //   // Send data to the new tab

  //   if (newWindow) {
  //     // Communicate the messages to the new window
  //     this.chatService.setAllMessages(messages);
  //     console.log('Messages to be sent:', messages);
  //     // newWindow.postMessage({ messages }, '*');
  //     setTimeout(() => {
  //       newWindow.postMessage({ data: messages }, window.location.origin);
  //     }, 1000); // Adjust the delay as needed


  //     // newWindow.postMessage({ data: messages }, window.location.origin);

  //     this.chatService.setData(messages);
  //     // const detailPage = window.open('/details');
  //     // newWindow.postMessage(messages, '*');
  //     // parent window
  //     localStorage.setItem("messages", JSON.stringify(messages));

  //     newWindow.location.href = '/new-window'; // Navigate to the route for the new component
  //   } else {
  //     console.error('Failed to open the new window.');
  //   }
  // }





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


