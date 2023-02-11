import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const now = Date.now();
        Logger.log('Before execute...');

        return next.handle().pipe(
            tap(() => Logger.log(`After execute... ${Date.now() - now}ms`)),
            catchError((err) => {
                Logger.log(`After execute... ${Date.now() - now}ms with exception`);
                return throwError(() => err);
            }),
        );
    }
}
