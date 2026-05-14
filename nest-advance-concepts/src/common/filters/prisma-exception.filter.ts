import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { Prisma } from '@app/generated/prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter<Prisma.PrismaClientKnownRequestError> {
    private readonly logger = new Logger(PrismaExceptionFilter.name);

    catch(
        exception: Prisma.PrismaClientKnownRequestError,
        host: ArgumentsHost,
    ) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        this.logger.error(
            `Prisma error ${exception.code}: ${exception.message}`,
        );

        switch (exception.code) {
            case 'P2025': // Record not found
                response.status(404).json({
                    statusCode: 404,
                    message: 'Resource not found',
                    timestamp: new Date().toISOString(),
                });
                break;
            case 'P2002': // Unique constraint violation
                response.status(409).json({
                    statusCode: 409,
                    message: 'Conflict: Unique constraint violation',
                    timestamp: new Date().toISOString(),
                });
                break;
            default:
                response.status(500).json({
                    statusCode: 500,
                    message: 'Internal server error',
                    timestamp: new Date().toISOString(),
                });
        }
    }
}
