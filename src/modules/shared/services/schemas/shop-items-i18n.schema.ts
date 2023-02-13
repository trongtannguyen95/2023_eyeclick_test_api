import * as mongoose from 'mongoose';


export const ShopItemsI18nSchema = new mongoose.Schema(
    {
        item_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ShopItems',
        },
        name: {
            type: String,
            required: false,
            default: '',
        },
        description: {
            type: String,
            required: false,
            default: '',
        },
        language: {
            type: String,
            required: false,
            default: 'en',
        },
        deleted: {
            type: Number,
            required: true,
            default: 0,
        },
        created: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
        },
        modified: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
        },
    },
    {
        collection: 'shop_items_i18n',
        timestamps: true,
    },
);
