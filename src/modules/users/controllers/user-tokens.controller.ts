import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BaseControllerFactory } from '~base/base.controller';
import { AddToBlackListDto, TokenFilterDto } from '../dtos/token.dto';
import { Body, Headers, HttpStatus, Injectable, Ip, Logger, Post, Res } from '@nestjs/common';
import { IUserToken } from '~shared/services/interfaces/user-token.interface';
import { UserTokensService } from '../services/user-tokens.service';
import { ResponseBody } from '~base/models/response-body.model';
import { Response } from 'express';
import { UserParams } from '../decorators/user-params.decorator';
import { UserModel } from '../models/user.model';
import { JwtService } from '@nestjs/jwt';
import { UserTokensResourceMetadata } from '../metadatas/user-tokens.metadata';
import { UserActivitiesService } from '~users/services/user-activities.service';

const BaseController = BaseControllerFactory<IUserToken>({
    isAuth: true,
    metaData: UserTokensResourceMetadata,
    cFiltersDto: TokenFilterDto,
});

@Injectable()
export class UserTokensController extends BaseController {
    constructor(
        private readonly userTokensService: UserTokensService,
        private readonly jwtService: JwtService,
        private readonly userActivitiesService: UserActivitiesService,
    ) {
        super(userTokensService);
    }

    @Post('addToBlackList')
    @ApiOperation({ description: 'user blacklist an token' })
    @ApiResponse({ status: 200, description: 'blacklist token successfully.' })
    async addToBlackList(
        @Body() addToBlackListDto: AddToBlackListDto,
        @Res() res: Response,
        @Ip() ipv4: string,
        @Headers('user-agent') ua: string,
        @UserParams() user: UserModel,
    ) {
        const response: ResponseBody = {
            statusCode: 200,
            data: null,
            message: null,
        };
        try {
            const permission = this.checkAuth(user, 'addToBlackList') || 1;
            const tokenInfo = await this.jwtService.verify(addToBlackListDto.token);

            if (tokenInfo) {
                this.checkAuthRecord(user, tokenInfo['id'], permission);
                const check = await this.userTokensService.addToBackList(addToBlackListDto.token, tokenInfo, user);
                if (check) {
                    this.userActivitiesService.audit({
                        module: 'users',
                        resource: 'auth',
                        action: 'logout',
                        message: `${user.username} has successfully logged out`,
                        data: {
                            ...check,
                            username: user.username,
                        },
                        userId: user.id,
                        resourceId: user.id,
                        ipv4,
                        ua,
                    });
                }
                response.statusCode = 200;
                response.data = check;
            } else {
                response.statusCode = 404;
                response.message = 'Invalid Data Token';
            }
            return res.status(HttpStatus.OK).json(response);
        } catch (error) {
            response.statusCode = 500;
            Logger.error(error.message || error.text, BaseController.name);
            response.message = 'Opps! Something went wrong.';
            return res.status(HttpStatus.OK).json(response);
        }
    }
}
