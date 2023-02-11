import * as mongoose from 'mongoose';


export const UserTokensSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
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
            default: 0,
        },

        tokenHash: {
            type: String,
            required: false,
        },

        token: {
            type: String,
            required: true,
        },

        iat: {
            type: Number,
            required: true,
            default: 0,
        },

        exp: {
            type: Number,
            required: true,
            default: 0,
        },

        ip: {
            type: String,
            required: false,
        },

        agentInfo: {
            type: mongoose.Schema.Types.Mixed,
            require: true,
            default: {},
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
        collection: process.env.DB_PREFIX + 'user_tokens',
        timestamps: true,
    },
);
