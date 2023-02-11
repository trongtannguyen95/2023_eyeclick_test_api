import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { genSha256 } from '../../../helpers/util.helper';

@Injectable()
export class AuthGuard implements CanActivate {
    logger: Logger;
    constructor(private readonly jwtService: JwtService) {
        this.logger = new Logger('AuthGuard');
    }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        if (!request.headers.authorization) {
            throw new HttpException('Empty token', HttpStatus.UNAUTHORIZED);
        }
        request.user = await this.validateToken(request.headers.authorization);
        // console.log(request.user, 'request.user ');
        return true;
    }
    async validateToken(auth: string) {
        const authArr = auth.split(' ');
        if (authArr[0] !== 'Bearer') {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }
        const token = authArr[authArr.length - 1];
        try {
            const decoded = this.jwtService.verify(token);
            return decoded;
        } catch (err) {
            const message = 'Token error: ' + (err.message || err.name);
            throw new HttpException(message, HttpStatus.UNAUTHORIZED);
        }
    }
}
