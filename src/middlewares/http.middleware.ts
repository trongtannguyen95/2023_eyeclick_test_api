import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';


@Injectable()
export class HttpMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        // Logger.debug(req.ip, HttpMiddleware.name);
        // Logger.debug(req.headers['user-agent'], HttpMiddleware.name);
        res.header('X-Powered-By', process.env.APP_NAME);
        next();
    }

    getBaseOrigin(referer: string): string | null {
        if (referer) {
            const match = /^http([s]?):\/\/([a-zA-Z0-9-_\.]+)(:[0-9]+)?/i.exec(referer);
            return match ? match[0] : null;
        }
        return null;
    }
}
