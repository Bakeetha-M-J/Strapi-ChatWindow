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
  pageId: any;
  time = new Date();
  registrationForm!: FormGroup;
  submitted = false;


  messageText: any;
  receivedMessage: string = '';
  private messageEventListener: any;


  constructor(public chatService: ChatService,
    public fb: FormBuilder) {


  }

  ngOnInit() {
    // this.pageId = localStorage.getItem('pageId');
    // // Send the first initial message
    // const initialMessage1 = new Message('bot', 'One moment as we connect you to a Representative.');
    // this.messages = this.messages.concat([initialMessage1]);
    // this.chatService.conversation.next([initialMessage1]);

    // // Send the second initial message after a delay
    // setTimeout(() => {
    //   const initialMessage2 = new Message('bot', 'Hello, thank you for your inquiry. Unfortunately, our live Talent Acquisition team member is currently unavailable. A member of our team will get back to you as soon as possible within the next 24 hours. Thank you!');
    //   this.messages = this.messages.concat([initialMessage2]);
    //   // this.chatService.conversation.next([initialMessage2]);
    // }, 5000);
    // child widnow
    // In the child window's script
    window.addEventListener('message', (event) => {
      // Handle messages received from the parent window
      console.log('Message received in child:', event.data);
      if (event.origin === window.location.origin) {
        // Do something with the data, e.g., update UI
        const receivedData = event.data.data;
        console.log('Received data in child:', receivedData);
        this.messages = receivedData;
        // this.receivedMessage = receivedData;
      }
    });



      // Delay adding the event listener
  // setTimeout(() => {
  //   window.addEventListener('message', (event) => {
  //     // Handle messages received from the child window
  //     console.log('Message received in child method 2:', event.data);
  //     this.receivedMessage = event.data;
  //     if (event.origin === window.location.origin) {
  //       // Do something with the data, e.g., update UI
  //       const receivedData = event.data.data;
  //       console.log('Received data in child method 2:', receivedData);
  //       this.messages = receivedData;
  //     }
  //   });
  // }, 1000); // Adjust the delay as needed

// Add event listener for messages from parent
// window.addEventListener('message', (event) => {
//   if (event.origin === window.location.origin) {
//     const receivedData = event.data.data;
//     console.log('Received data in child:', receivedData);
//     this.messages = receivedData;
//   }
// });

    // const allmsg: any = localStorage.getItem("messages");
    // this.messages = JSON.parse(allmsg.toString());
    // console.log('localStorage allMessages', this.messages);
    // localStorage.removeItem("messages");

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
      localStorage.removeItem("messages");
      localStorage.setItem("messages", JSON.stringify(this.messages));
    });


    //   Observable.interval(1000).subscribe((x) => {
    //     this.chatTimeOut = true;
    // });

    // this.chatService.conversation.subscribe((val: any) => {
    //   console.log('messages', this.messages, val);
    //   this.messages = this.messages.concat(val);
    //   console.log('messages-concat', this.messages);
    // });
    // this.messageEventListener = this.onMessageHandler.bind(this);
    // window.addEventListener('message', this.messageEventListener, false);

  }

  openChatBot() {
    this.chatFlag = !this.chatFlag;
    this.chatboxFlag = false;
  }

  sendMessage() {
    this.chatService.getBotAnswer(this.value);
    this.value = '';
    // this.chatService.addMessage(this.messages);

  }

  // sendMessage() {
  //   // Assuming some logic to send a message back to the parent
  //   window.opener.postMessage({ data: this.value }, window.location.origin);
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
    window.close();
  }

  toParentWindow(event: Event): void {
    // Fetch or update messages asynchronously (example using a Promise)
    this.fetchMessages().then(() => {
      // Define the message event listener outside the window.close() call
      const messageListener = (event: any) => {
        console.log('toParentWindow', event.data);
        event.source.postMessage({ data: this.messages }, event.origin);

        // Remove the event listener after sending the message
        window.removeEventListener('message', messageListener);
      };

      // Add the message event listener
      window.addEventListener('message', messageListener, true);

      // Close the window after adding the event listener
      window.close();
    });
  }

  // Example asynchronous method to fetch or update messages
  fetchMessages(): Promise<void> {
    return new Promise<void>((resolve) => {
      // Your logic to fetch or update messages goes here
      // For example, fetching messages from an API
      this.chatService.allmessages$.subscribe((messages:any) => {
        console.log('fetchMessages',messages);
        this.messages = messages;
        window.opener.postMessage(this.messages, '*');
    // window.close();
        resolve();
      });
    });
  }



  ngOnDestroy(): void {
    window.removeEventListener('message', this.messageEventListener, false);
  }

  // onMessageHandler(event: MessageEvent): void {
  //   if (typeof event.data === 'string') {
  //     this.receivedMessage = event.data;
  //   }
  // }
  sendPostMessage(): void {
    window.opener.postMessage(this.messageText, '*');
    // window.close();
  }
  // messageListener1:any;
  // toParentWindow(event: Event): void {
  //   // Define the message event listener outside the window.close() call
  //   const messageListener = (event: any) => {
  //     // debugger
  //     console.log('toParentWindow', event.data);
  //     event.source.postMessage({data: this.messages}, event.origin);
  //     // Remove the event listener after sending the message
  //     window.removeEventListener('message', messageListener);
  //   };

  //   // Add the message event listener
  //   window.addEventListener('message', messageListener, true);

  //   // Close the window after adding the event listener
  //   // window.close();

  // }
  // toParentWindow(event: Event): void {
  //   window.addEventListener('message', (event: any) => {
  //     alert(event.data);
  //     console.log('toParentWindow',event.data);
  //     event.source.postMessage('Got it!', event.origin);

  //     // Remove the event listener after sending the message
  //     window.removeEventListener('message', event.source);
  //   }, true);

  //   window.close();
  // }


  // toParentWindow(event: Event): void {
  //   // to parent window
  //   // localStorage.setItem("messages", JSON.stringify(this.messages));
  //   // localStorage.removeItem("messages");

  //   // child window
  //   window.addEventListener('message', (event:any) => {
  //     // get out the message
  //     console.log(event.data);
  //     // and you can even send message back to parent window too.
  //     event.source.postMessage('Got it!', event.origin);
  //   }, false);


  //   window.close();
  // }

  // onSubmit() {
  //   this.submitted = true;
  //   // stop here if form is invalid
  //   if (this.registrationForm.valid) {
  //     // return;
  //     this.openchatFlag = !this.openchatFlag;
  //     this.chatboxFlag = false;
  //   }

  //   setTimeout(() => {
  //     this.chatTimeOut = true;
  //     this.chatFlag = false;
  //     this.chatboxFlag = false;
  //     this.openchatFlag = false;
  //   }, 5000000);
  // }


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

  //     newWindow.postMessage({ data: messages }, window.location.origin);

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




}
