import { forwardRef, Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { ShopItemsService } from './services/shop-items.service';
import { ShopItemsI18nService } from './services/shop-items-i18n.service';
import { ShopItemsController } from './controllers/shop-items.controller';
import { UserActivitiesService } from '~users/services/user-activities.service';
@Module({
    imports: [
        SharedModule,
    ],
    controllers: [ShopItemsController],
    providers: [
        ShopItemsService,
        ShopItemsI18nService,
        UserActivitiesService
    ],
    exports: [ShopItemsService, ShopItemsI18nService, UserActivitiesService],
})
export class ShopModule { }
