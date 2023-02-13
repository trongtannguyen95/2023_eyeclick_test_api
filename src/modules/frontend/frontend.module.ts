import { forwardRef, Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { ShopItemsService } from '../shop/services/shop-items.service';
import { ShopItemsI18nService } from '../shop/services/shop-items-i18n.service';
import { ShopController } from './controllers/shop.controller';
@Module({
    imports: [
        SharedModule,
    ],
    controllers: [ShopController],
    providers: [
        ShopItemsService,
        ShopItemsI18nService,
    ],
    exports: [ShopItemsService, ShopItemsI18nService],
})
export class FrontendModule { }
