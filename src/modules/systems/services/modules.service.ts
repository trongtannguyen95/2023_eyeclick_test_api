import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { MBaseService } from '../../base/mbase.service';
import { IModule } from '../../shared/services/interfaces/module.interface';

@Injectable()
export class ModulesService extends MBaseService<IModule> {
    constructor(@InjectModel('Modules') private readonly modulesModel: Model<IModule>) {
        super(modulesModel);
    }
}
