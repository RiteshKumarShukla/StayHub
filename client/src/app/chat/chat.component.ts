import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  messages: { content: string; fromUser: boolean }[] = [];
  userInput: string = '';

  constructor(private http: HttpClient) {}

  sendMessage() {
    const userMessage = this.userInput.trim();
    if (userMessage) {
      this.messages.push({ content: userMessage, fromUser: true });
      this.userInput = '';
      this.getChatbotResponse(userMessage);
    }
  }

  getChatbotResponse(userMessage: string) {
    this.http.post<any>('http://127.0.0.1:5000/api/chat', { prompt: userMessage }).subscribe(
      (response) => {
        const chatbotResponse = response.text;
        this.messages.push({ content: chatbotResponse, fromUser: false });
      },
      (error) => {
        console.error('Error fetching chatbot response:', error);
      }
    );
  }
}
