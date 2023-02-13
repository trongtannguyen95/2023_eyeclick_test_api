import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { MBaseService } from '../../base/mbase.service';
import { MyHttpService } from '../../shared/services/http.service';
import { IShopItemI18n } from '~shared/services/interfaces/shop-item-i18n.interface';
@Injectable()
export class ShopItemsI18nService extends MBaseService<IShopItemI18n> {
    constructor(
        @InjectModel('ShopItemsI18n') private readonly shopItemsI18nModel: Model<IShopItemI18n>,
        private readonly myHttp: MyHttpService,
    ) {
        super(shopItemsI18nModel);
    }
}
