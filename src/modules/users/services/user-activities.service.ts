import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { MBaseService } from '~base/mbase.service';
import { IUserActivity } from '~shared/services/interfaces/user-activity.interface';
import { IBaseAuditData } from '~base/models/base-controller.interface';
import { UAParser } from 'ua-parser-js';

@Injectable()
export class UserActivitiesService extends MBaseService<IUserActivity> {
    constructor(@InjectModel('UserActivities') private readonly userActivitiesModel: Model<IUserActivity>) {
        super(userActivitiesModel);
    }

    audit(docs: IBaseAuditData & { resource: string; module: string; userAgent?: any }) {
        if (docs.ua) {
            docs.userAgent = UAParser(docs.ua);
            delete docs.ua;
        }
        return this.createByUser(docs, docs.userId);
    }
}
