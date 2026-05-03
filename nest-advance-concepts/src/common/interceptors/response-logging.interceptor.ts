import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable, map } from 'rxjs';

@Injectable()
export class ResponseLoggingInterceptor<T = any> implements NestInterceptor<
    T,
    any
> {
    intercept(
        context: ExecutionContext,
        next: CallHandler<any>,
    ): Observable<any> | Promise<Observable<any>> {
        const request: Request = context.switchToHttp().getRequest();
        const start = Date.now();

        return next.handle().pipe(
            map((data: T) => {
                const executionTime = Date.now() - start;
                console.log(
                    `Request to ${request.url} took ${executionTime} ms`,
                );

                return {
                    success: !(data instanceof Error) && data !== null,
                    data,
                    timestamp: new Date().toISOString(),
                };
            }),
        );
    }
}
