import { Body, Controller, Get, Headers, HttpStatus, Ip, Logger, Post, Req, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { compareSync, hashSync } from 'bcrypt';
import dayjs from 'dayjs';
import { Request, Response } from 'express';
import { random } from '~/helpers/util.helper';
import { ResponseBody } from '~base/models/response-body.model';
import { UserActivitiesService } from '~users/services/user-activities.service';
import { ForgotDto, RenewPassWordDto, TokenDto } from '../dtos/token.dto';
import { UserModel } from '../models/user.model';
import { RequestForgotPasswordsService } from '../services/request-forgot-passwords.service';
import { UserTokensService } from '../services/user-tokens.service';
import { UsersService } from '../services/users.service';
import { UserRegisterDto } from '~users/dtos/user.dto';
@Controller('auth')
@ApiTags('users - auth resource')
export class AuthController {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly requestForgotPasswordService: RequestForgotPasswordsService,
        private readonly userTokensService: UserTokensService,
        private readonly userActivitiesService: UserActivitiesService,
    ) { }

    @Post('get-token')
    @ApiOperation({ description: 'users get token' })
    @ApiResponse({ status: 200, description: 'get token successfully.' })
    async getToken(
        @Res() res: Response,
        @Body() body: TokenDto,
        @Ip() ipv4: string,
        @Headers('user-agent') ua: string,
        @Req() req: Request,
    ) {
        const responseData: ResponseBody = { statusCode: 200 };
        try {
            console.log('APP_SECRET', process.env.APP_SECRET)
            const user = await this.usersService.findOne({ username: body.userName, status: 1, deleted: 0 });
            if (user) {
                const check = compareSync(body.password, user.password);
                if (check) {
                    const oldValidToken = await this.userTokensService.findOne({
                        created: user.id,
                        status: 0,
                        exp: { $gt: dayjs().unix() + 5000 },
                    });
                    if (oldValidToken?.token) {
                        responseData.data = oldValidToken.token;
                    } else {
                        responseData.statusCode = 200;
                        const userInfo = {
                            id: user.id,
                            name: user.name || 'N/A',
                            username: user.username,
                            email: user.email || 'N/A',
                            avartar: 'N/A',
                            fullName: user.name,
                            isAdministrator: user.isAdministrator,
                        } as UserModel;
                        const token = this.jwtService.sign(userInfo);

                        const checkSaveToken = await this.userTokensService.createLogToken(
                            req.ip,
                            req.headers['user-agent'],
                            userInfo,
                            token,
                        );
                        responseData.error = !checkSaveToken ? 'token not save!' : '';
                        responseData.data = token;
                    }

                    this.userActivitiesService.audit({
                        module: 'users',
                        resource: 'auth',
                        action: 'login',
                        userId: user.id,
                        resourceId: user.id,
                        message: `${user.username} has successfully logged in`,
                        data: {
                            success: true,
                            reuseToken: Boolean(oldValidToken?.token),
                            username: user.username,
                        },
                        ipv4,
                        ua,
                    });
                    return res.status(HttpStatus.OK).json(responseData);
                }

                this.userActivitiesService.audit({
                    module: 'users',
                    resource: 'auth',
                    action: 'login',
                    userId: user.id,
                    resourceId: user.id,
                    message: `${user.username} login failed`,
                    data: { success: false },
                    ipv4,
                    ua,
                });
            }
            responseData.statusCode = 400;
            responseData.message = 'Invalid account credential';
        } catch (error) {
            console.log(error);
            responseData.statusCode = 500;
            responseData.data = null;
            responseData.error = `AuthController: Error ${error.message}`;
            Logger.error(`AuthController: Error ${error.message}`);
        }

        return res.status(HttpStatus.OK).json(responseData);
    }

    @Post('forgot-password')
    @ApiOperation({ description: 'users forgot password' })
    @ApiResponse({ status: 200, description: 'get token successfully.' })
    async forgotPassword(@Res() res: Response, @Body() query: ForgotDto) {
        const responseData: ResponseBody = { statusCode: 200 };
        try {
            const user = await this.usersService.findOne({ email: query.email });
            if (user) {
                const expiredTime = dayjs().add(1, 'h').toDate();
                const check = await this.requestForgotPasswordService.create({
                    expriedTime: expiredTime,
                    tokenCode: random(16),
                    requestUser: user.id,
                    email: user.email,
                });
                if (check) {
                    // this.sendMailQueue.add({
                    //     email: user.email,
                    //     fullName: user.name,
                    //     userName: user.username,
                    //     requestId: check.id,
                    //     tokenCode: check.tokenCode,
                    //     type: 'forgot',
                    // });
                    responseData.statusCode = 200;
                    responseData.message = `Please check your email. Contact to administrator if you don't receive email`;
                    return res.status(HttpStatus.OK).json(responseData);
                }
            }
            responseData.statusCode = 401;
            responseData.message = 'Invalid account credential';
            return res.status(HttpStatus.OK).json(responseData);
        } catch (error) {
            console.log(error);
            responseData.statusCode = 500;
            responseData.data = null;
            responseData.error = `AuthController: Error ${error.message}`;
            Logger.error(`AuthController: Error ${error.message}`);
            return res.status(HttpStatus.OK).json(responseData);
        }
    }

    @Post('renew-password')
    @ApiOperation({ description: 'users forgot password' })
    @ApiResponse({ status: 200, description: 'get token successfully.' })
    async renewPassword(@Res() res: Response, @Body() query: RenewPassWordDto) {
        const responseData: ResponseBody = { statusCode: 200 };
        try {
            const requestPassword = await this.requestForgotPasswordService.findOne({
                email: query.email,
                tokenCode: query.tokenCode,
            });
            if (requestPassword) {
                if (query.password !== query.confirmPassword) {
                    responseData.statusCode = 900;
                    responseData.message = 'password & confirm password does not match';
                    return res.status(HttpStatus.OK).json(responseData);
                }
                if (requestPassword.status === 3) {
                    responseData.statusCode = 901;
                    responseData.message = 'You has been channge password!';
                    return res.status(HttpStatus.OK).json(responseData);
                }
                const currentTime = dayjs();
                const expiredTime = dayjs(requestPassword.expriedTime);
                if (currentTime.isAfter(expiredTime)) {
                    responseData.statusCode = 902;
                    responseData.message = 'You request has been expired!';
                    return res.status(HttpStatus.OK).json(responseData);
                }
                const newhasPassword = hashSync(query.password, 10);
                const check = await this.usersService.update(requestPassword.requestUser, { password: newhasPassword });
                if (check) {
                    await this.requestForgotPasswordService.update(requestPassword.id, { status: 3 });
                    responseData.statusCode = 200;
                    responseData.message = 'Your password has been change!';
                    return res.status(HttpStatus.OK).json(responseData);
                } else {
                    responseData.statusCode = 903;
                    responseData.message = 'Your password can not change at right now, please contact to administrator!';
                    return res.status(HttpStatus.OK).json(responseData);
                }
            }
            responseData.statusCode = 401;
            responseData.message = 'Invalid request change password';
            return res.status(HttpStatus.OK).json(responseData);
        } catch (error) {
            console.log(error);
            responseData.statusCode = 500;
            responseData.data = null;
            responseData.error = `AuthController: Error ${error.message}`;
            Logger.error(`AuthController: Error ${error.message}`);
            return res.status(HttpStatus.OK).json(responseData);
        }
    }

    // need to be deleted on production.
    @Get('sync-default-administrator')
    async getDefaultAdministrator(@Res() res: Response) {
        const responseData: ResponseBody = { statusCode: 200 };
        const appEnv = process.env.NODE_ENV || 'local';
        if (appEnv !== 'production') {
            await this.usersService.upSert(
                { username: 'normaluser' },
                {
                    username: 'normaluser',
                    password: hashSync('normaluser@2023', 10),
                    isAdministrator: 0,
                    email: 'normaluser@normaluser.com',
                    phone: '0962548587',
                    status: 1,
                    deleted: 0,
                },
            );

            await this.usersService.upSert(
                { username: 'administrator' },
                {
                    username: 'administrator',
                    password: hashSync('administrator@2023', 10),
                    isAdministrator: 1,
                    email: 'system@system.com',
                    name: 'Admin User',
                    phone: '0962548587',
                    status: 1,
                    deleted: 0,
                },
            );

            responseData.message = 'password in config!';
            return res.status(HttpStatus.OK).json(responseData);
        }
        responseData.message = 'can not get administrator account in production mode!';
        return res.status(HttpStatus.OK).json(responseData);
    }

    @Post('register')
    @ApiOperation({ description: 'users register' })
    @ApiResponse({ status: 200, description: 'registered successfully.' })
    async register(
        @Res() res: Response,
        @Body() body: UserRegisterDto,
        @Req() req: Request,
    ) {
        const responseData: ResponseBody = { statusCode: 200 };
        try {
            if(body['confirmPassword'] != body['password']){
                responseData.statusCode = 422;
                responseData.error = 'Password confirm is not correct';
                return res.status(HttpStatus.OK).json(responseData);

            }
            const user = await this.usersService.create(
                {
                    username: body.username,
                    password: hashSync(body.password, 10),
                    isAdministrator: 0,
                    email: body.email,
                    address: body.address,
                    name: body.name,
                    phone: body.phone || 'N/A',
                    status: 1,
                    deleted: 0,
                },
            );
            if(user){
                const userInfo = {
                    id: user.id,
                    name: user.name || 'N/A',
                    username: user.username,
                    email: user.email || 'N/A',
                    avartar: 'N/A',
                    fullName: user.name,
                    isAdministrator: user.isAdministrator,
                } as UserModel;
                const token = this.jwtService.sign(userInfo);

                const checkSaveToken = await this.userTokensService.createLogToken(
                    req.ip,
                    req.headers['user-agent'],
                    userInfo,
                    token,
                );
                responseData.error = !checkSaveToken ? 'token not save!' : '';
                responseData.data = token;
                responseData.message = 'Registered successfully';
            }else{
                responseData.statusCode = 400;
                responseData.error = 'Registered unsuccessfully';
            }
            return res.status(HttpStatus.OK).json(responseData);

        } catch (error) {
            responseData.statusCode = 500;
            responseData.data = null;
            responseData.error = `AuthController: Error ${error.message}`;
            Logger.error(`AuthController: Error ${error.message}`);
            return res.status(HttpStatus.OK).json(responseData);
        }
    }
}
