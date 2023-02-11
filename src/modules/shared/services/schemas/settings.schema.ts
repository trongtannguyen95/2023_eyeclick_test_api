import * as mongoose from 'mongoose';


export const SettingsSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        key: {
            type: String,
            unique: true,
            required: true,
            lowercase: true,
        },
        value: {
            type: String,
            required: true,
        },
        status: {
            type: Number,
            required: true,
            default: 0,
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
        collection: process.env.DB_PREFIX + 'settings',
        timestamps: true,
    },
);
