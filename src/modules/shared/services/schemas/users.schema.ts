import * as mongoose from 'mongoose';


export const UsersSchema = new mongoose.Schema(
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
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: false,
        },
        email: {
            type: String,
            required: false,
        },
        address: {
            type: String,
            required: false,
        },
        shoppingCart: {
            type: Object,
            required: false,
        },
        isAdministrator: {
            type: Number,
            required: false,
            default: 0,
        },
    },
    {
        collection: 'users',
        timestamps: true,
    },
);
