import { Injectable } from '@nestjs/common';
import { BaseControllerFactory } from '~base/base.controller';
import { IShopItem } from '~shared/services/interfaces/shop-item.interface';
import { ShopItemCreateDto, ShopItemUpdateDto, ShopItemsFilterDto } from '../dtos/shop-items.dto';
import { ShopItemsResourceMetadata } from '../metadatas/shop-items.metadata';
import { ShopItemsService } from '../services/shop-items.service';
const BaseController = BaseControllerFactory<IShopItem>({
    isAuth: true,
    metaData: ShopItemsResourceMetadata,
    cFiltersDto: ShopItemsFilterDto,
    cCreateDto: ShopItemCreateDto,
    cUpdateDto: ShopItemUpdateDto,
});

@Injectable()
export class ShopItemsController extends BaseController {
    constructor(private readonly shopItemsService: ShopItemsService) {
        super(shopItemsService);
    }
    
}
