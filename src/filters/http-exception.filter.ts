import { ExceptionFilter, Catch, NotFoundException, ArgumentsHost } from '@nestjs/common';
import { HttpException } from '@nestjs/common';

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const requestedUrl = request.protocol + '://' + request.get('Host') + request.url;
        console.log(requestedUrl);
        return response.status(exception.getStatus()).json(exception.getResponse());
    }
}
