import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { MBaseService } from '../../base/mbase.service';
import { IAction } from '../../shared/services/interfaces/action.interface';

@Injectable()
export class ActionsService extends MBaseService<IAction> {
    constructor(@InjectModel('Actions') private readonly actionsModel: Model<IAction>) {
        super(actionsModel);
    }
}
