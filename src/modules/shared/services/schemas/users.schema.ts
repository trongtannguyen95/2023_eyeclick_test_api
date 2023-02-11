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
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        address: {
            type: String,
            required: true,
        },
        roleId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Roles',
        },
        isAdministrator: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    {
        collection: process.env.DB_PREFIX + 'users',
        timestamps: true,
    },
);
