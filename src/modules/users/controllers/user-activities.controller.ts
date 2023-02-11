import { BaseControllerFactory } from '~base/base.controller';
import { Injectable } from '@nestjs/common';
import { IUserToken } from '~shared/services/interfaces/user-token.interface';
import { UserActivitiesResourceMetadata } from '~users/metadatas/user-activities.metadata';
import { UserActivityFilterDto } from '~users/dtos/activity.dto';
import { UserActivitiesService } from '~users/services/user-activities.service';

const BaseController = BaseControllerFactory<IUserToken>({
    isAuth: true,
    metaData: UserActivitiesResourceMetadata,
    cFiltersDto: UserActivityFilterDto,
});

@Injectable()
export class UserActivitiesController extends BaseController {
    constructor(private readonly userActivitiesService: UserActivitiesService) {
        super(userActivitiesService);
    }
}
