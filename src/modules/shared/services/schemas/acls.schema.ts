import * as mongoose from 'mongoose';


export const AclsSchema = new mongoose.Schema(
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
            default: 0,
        },
        module: {
            type: String,
            required: true,
        },
        resource: {
            type: String,
            required: true,
        },
        action: {
            type: String,
            required: true,
        },
        permission: {
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
        collection: process.env.DB_PREFIX + 'acls',
        timestamps: true,
    },
);
