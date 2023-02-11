import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserModel } from '../models/user.model';

export const UserParams = createParamDecorator((data: unknown, ctx: ExecutionContext): UserModel => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as UserModel;
});
