import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { MBaseService } from '../../base/mbase.service';
import { IAcl } from '../../shared/services/interfaces/acl.interface';

@Injectable()
export class AclsService extends MBaseService<IAcl> {
    constructor(@InjectModel('Acls') private readonly aclsModel: Model<IAcl>) {
        super(aclsModel);
    }
}
