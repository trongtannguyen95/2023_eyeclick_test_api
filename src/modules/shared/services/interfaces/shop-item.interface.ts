import { Document } from 'mongoose';

export interface IShopItem extends Document {
    readonly name?: string | any;
    readonly description?: string | any;
    readonly price?: number | any;
    readonly image?: string | any;
    readonly deleted?: string | any;
    readonly status?: number | any;
    readonly created?: string | any;
    readonly modified?: string | any;
}
