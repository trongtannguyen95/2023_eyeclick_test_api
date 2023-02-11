import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { MBaseService } from '../../base/mbase.service';
import { IUser } from '../../shared/services/interfaces/user.interface';
import { getResourceActionsMetaData } from '../helpers/auth.helper';
import { MyHttpService } from '../../shared/services/http.service';

@Injectable()
export class UsersService extends MBaseService<IUser> {
    constructor(
        @InjectModel('Users') private readonly usersModel: Model<IUser>,
        private readonly myHttp: MyHttpService,
    ) {
        super(usersModel);
    }
}
