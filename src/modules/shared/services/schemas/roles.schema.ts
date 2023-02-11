import * as mongoose from 'mongoose';


export const AclsSchema = new mongoose.Schema({
    module: {
        type: String,
    },
    resource: {
        type: String,
    },
    action: {
        type: String,
    },
    permission: {
        type: Number,
    },
});
export const RolesSchema = new mongoose.Schema(
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
        acls: {
            type: [AclsSchema],
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
        collection: process.env.DB_PREFIX + 'roles',
        timestamps: true,
    },
);
