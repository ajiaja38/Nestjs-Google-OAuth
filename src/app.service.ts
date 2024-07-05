import { Injectable } from '@nestjs/common';
import { MessageService } from './app/message/message.service';

@Injectable()
export class AppService {
  constructor(private messageService: MessageService) {}

  public getHello(): void {
    this.messageService.setMessage('Hello Nest Framework Google auth0!');
  }
}
