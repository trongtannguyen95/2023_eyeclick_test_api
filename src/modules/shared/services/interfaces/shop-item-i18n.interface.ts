import { Document } from 'mongoose';

export interface IShopItemI18n extends Document {
    readonly name?: string | any;
    readonly description?: string | any;
    readonly language?: string | any;
    readonly deleted?: string | any;
    readonly status?: number | any;
    readonly created?: string | any;
    readonly modified?: string | any;
}
