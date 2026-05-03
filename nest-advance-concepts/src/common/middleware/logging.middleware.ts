import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export class LoggingMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const { method, originalUrl, ip } = req;
        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] ${method} ${originalUrl} ${ip}`);
        next();
    }
}
