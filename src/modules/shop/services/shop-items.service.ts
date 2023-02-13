import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { MBaseService } from '../../base/mbase.service';
import { MyHttpService } from '../../shared/services/http.service';
import { IShopItem } from '~shared/services/interfaces/shop-item.interface';
@Injectable()
export class ShopItemsService extends MBaseService<IShopItem> {
    constructor(
        @InjectModel('ShopItems') private readonly shopItemsModel: Model<IShopItem>,
        private readonly myHttp: MyHttpService,
    ) {
        super(shopItemsModel);
    }
}
