import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageService {
  private message: string;

  setMessage(message: string): void {
    this.message = message;
  }

  getMessage(): string {
    return this.message;
  }
}
