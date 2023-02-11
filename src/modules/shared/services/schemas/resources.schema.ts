import * as mongoose from 'mongoose';


export const ResourcesSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
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
        moduleId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Modules',
            required: true,
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
        collection: process.env.DB_PREFIX + 'resources',
        timestamps: true,
    },
);
