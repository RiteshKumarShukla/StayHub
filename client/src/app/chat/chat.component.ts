// import { Component } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-chat',
//   templateUrl: './chat.component.html',
//   styleUrls: ['./chat.component.css']
// })
// export class ChatComponent {
//   messages: { content: string; fromUser: boolean }[] = [];
//   userInput: string = '';

//   constructor(private http: HttpClient) {}

//   sendMessage() {
//     const userMessage = this.userInput.trim();
//     if (userMessage) {
//       this.messages.push({ content: userMessage, fromUser: true });
//       this.userInput = '';
//       this.getChatbotResponse(userMessage);
//     }
//   }

//   getChatbotResponse(userMessage: string) {
//     this.http.post<any>('http://127.0.0.1:5000/api/chat', { prompt: userMessage }).subscribe(
//       (response) => {
//         const chatbotResponse = response.text;
//         this.messages.push({ content: chatbotResponse, fromUser: false });
//       },
//       (error) => {
//         console.error('Error fetching chatbot response:', error);
//       }
//     );
//   }
// }


import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messages: { content: string; fromUser: boolean }[] = [];
  userInput: string = '';
  isProcessing: boolean = false;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    // Show a welcome message from the chatbot when the component initializes
    const welcomeMessage = "Hello! I'm your hotel booking assistant. How can I assist you today?";
    this.messages.push({ content: welcomeMessage, fromUser: false });
  }

  sendMessage() {
    const userMessage = this.userInput.trim();
    if (userMessage) {
      this.messages.push({ content: userMessage, fromUser: true });
      this.userInput = '';
      this.getChatbotResponse(userMessage);
    }
  }

  getChatbotResponse(userMessage: string) {
    this.isProcessing = true; // Set the flag to show "Processing Your Request..." message

    this.http.post<any>('https://stayhub-backend.onrender.com/api/chat', { prompt: userMessage }).subscribe(
      (response) => {
        this.isProcessing = false; // Response received, so hide the "Processing Your Request..." message
        const chatbotResponse = response.text;
        this.messages.push({ content: chatbotResponse, fromUser: false });
      },
      (error) => {
        this.isProcessing = false; // Error occurred, so hide the "Processing Your Request..." message
        console.error('Error fetching chatbot response:', error);
        const errorMessage = 'Oops! Something went wrong while processing your request. Please try again later.';
        this.messages.push({ content: errorMessage, fromUser: false });
      }
    );
  }
}

