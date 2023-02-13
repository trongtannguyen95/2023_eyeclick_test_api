import * as mongoose from 'mongoose';


export const ShopItemsSchema = new mongoose.Schema(
    {
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
        image: {
            type: String,
            required: false,
            default: '',
        },
        price: {
            type: Number,
            required: false,
            default: '',
        },
        deleted: {
            type: Number,
            required: true,
            default: 0,
        },
        status: {
            type: Number,
            required: true,
            default: 1,
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
        collection: 'shop_items',
        timestamps: true,
    },
);
