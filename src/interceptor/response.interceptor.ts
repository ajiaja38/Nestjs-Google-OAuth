import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { MessageService } from '../app/message/message.service';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor(private readonly messageService: MessageService) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    return next.handle().pipe(
      map((res) => {
        const response = {
          code: context.switchToHttp().getResponse().statusCode,
          status: true,
          message:
            this.messageService.getMessage() || 'Successfully retrieve data',
        };

        if (res) {
          if (Array.isArray(res)) {
            response['data'] = res;
          } else if (res.meta) {
            response['data'] = res.data;
            response['meta'] = res.meta;
          } else {
            response['data'] = res;
          }
        }

        return response;
      }),
    );
  }
}
