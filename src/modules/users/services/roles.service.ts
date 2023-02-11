import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { MBaseService } from '../../base/mbase.service';
import { IRole } from '../../shared/services/interfaces/role.interface';

@Injectable()
export class RolesService extends MBaseService<IRole> {
    constructor(@InjectModel('Roles') private readonly rolesModel: Model<IRole>) {
        super(rolesModel);
    }
}
