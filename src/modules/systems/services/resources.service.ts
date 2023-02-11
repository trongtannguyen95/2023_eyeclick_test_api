import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { MBaseService } from '../../base/mbase.service';
import { IResource } from '../../shared/services/interfaces/resource.interface';

@Injectable()
export class ResourcesService extends MBaseService<IResource> {
    constructor(@InjectModel('Resources') private readonly resoucesModel: Model<IResource>) {
        super(resoucesModel);
    }
}
