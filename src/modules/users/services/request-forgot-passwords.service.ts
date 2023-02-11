import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MBaseService } from '../../base/mbase.service';
import { IRequestForgotPassword } from '../../shared/services/interfaces/request-forgot-password.interface';

@Injectable()
export class RequestForgotPasswordsService extends MBaseService<IRequestForgotPassword> {
    constructor(
        @InjectModel('RequestForgotPasswords')
        private readonly RequestForgotPasswordsModel: Model<IRequestForgotPassword>,
    ) {
        super(RequestForgotPasswordsModel);
    }
}
