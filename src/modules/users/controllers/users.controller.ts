import { Body, Get, HttpStatus, Injectable, Logger, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { compareSync, hashSync } from 'bcrypt';
import { Response } from 'express';
import { BaseControllerFactory } from '~base/base.controller';
import { ResponseBody } from '~base/models/response-body.model';
import { IUser } from '~shared/services/interfaces/user.interface';
import { UsersResourceMetadata } from '~users/metadatas/user.metadata';
import { UserParams } from '../decorators/user-params.decorator';
import { ChangeUserPasswordDto, UserCreateDto, UserFilterDto, UserUpdateDto } from '../dtos/user.dto';
import { UserModel } from '../models/user.model';
import { UsersService } from '../services/users.service';

const BaseController = BaseControllerFactory<IUser>({
    isAuth: true,
    metaData: UsersResourceMetadata,
    cFiltersDto: UserFilterDto,
    cCreateDto: UserCreateDto,
    cUpdateDto: UserUpdateDto,
});

@Injectable()
export class UsersController extends BaseController {
    constructor(private readonly usersService: UsersService) {
        super(usersService);

        this.addHook('saving', this.hashUserPassword);
        this.addHook('saved', (record) => {
            record.password = '';
        });
    }

    hashUserPassword(entity: UserCreateDto) {
        if (entity.password) {
            entity.password = hashSync(entity.password, 10);
        } else {
            delete entity.password;
        }
    }

    @Get('me')
    @ApiOperation({ description: `Api get user profile` })
    @ApiResponse({ status: 200, description: 'Ok' })
    async getMe(@Res() res: Response, @UserParams() user: UserModel) {
        const responseBody: ResponseBody = {
            statusCode: 200,
            data: null,
            message: null,
            error: null,
        };
        try {
            const userDoc = await this.usersService.findOne({ _id: user.id });
            user.createdAt = userDoc['createdAt'];
            responseBody.data = user;
            return res.status(HttpStatus.OK).json(responseBody);
        } catch (error) {
            responseBody.statusCode = 500;
            responseBody.error = error.message || error.text;
            return res.status(HttpStatus.OK).json(responseBody);
        }
    }

    @Post('/changePassword')
    @ApiOperation({ description: `Api change password` })
    @ApiResponse({ status: 200, description: 'Ok' })
    async changePassword(@Res() res: Response, @UserParams() user: UserModel, @Body() changeUserPasswordDto: ChangeUserPasswordDto) {
        const responseBody: ResponseBody = {
            statusCode: 200,
            data: null,
            message: null,
            error: null,
        };
        try {
            if (changeUserPasswordDto.newPassword != null && changeUserPasswordDto.newPassword == changeUserPasswordDto.confirmPassword) {
                const strengthPasswordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/g;
                if (changeUserPasswordDto.newPassword.match(strengthPasswordRegex)) {
                    const userData = await this.usersService.findById(user.id);
                    if (userData) {
                        const checkPass = compareSync(changeUserPasswordDto.currentPassword, userData.password);
                        Logger.debug(checkPass, 'checkPass');
                        Logger.debug(changeUserPasswordDto.currentPassword, 'changeUserPasswordDto.currentPassword');
                        Logger.debug(userData.password, 'userData.password');
                        if (compareSync(changeUserPasswordDto.currentPassword, userData.password)) {
                            const newHashPasword = hashSync(changeUserPasswordDto.newPassword, 10);
                            const check = await this.usersService.update(user.id, { password: newHashPasword });
                            if (check) {
                                responseBody.statusCode = HttpStatus.OK;
                                responseBody.message = 'Password has changed!';
                            } else {
                                responseBody.statusCode = HttpStatus.UNAUTHORIZED;
                                responseBody.message = 'Can not change password right now, please contact to administrator!';
                            }
                        } else {
                            responseBody.statusCode = HttpStatus.UNAUTHORIZED;
                            responseBody.message = 'Current password does not match!';
                        }
                    } else {
                        responseBody.statusCode = HttpStatus.UNAUTHORIZED;
                        responseBody.message = 'Invalid User!';
                    }
                } else {
                    responseBody.statusCode = HttpStatus.BAD_REQUEST;
                    responseBody.message =
                        'New password very weak! At least one upper case, At least one lower case, ' +
                        'At least one digit, At least one special character, Minimum eight in length';
                }
            } else {
                responseBody.statusCode = HttpStatus.UNAUTHORIZED;
                responseBody.message = 'Confirm password does not match!';
            }

            return res.status(HttpStatus.OK).json(responseBody);
        } catch (error) {
            responseBody.statusCode = 500;
            responseBody.error = error.message || error.text;
            return res.status(HttpStatus.OK).json(responseBody);
        }
    }
}
