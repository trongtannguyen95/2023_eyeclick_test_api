import * as mongoose from 'mongoose';


export const RequestForgotPasswordsSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        description: {
            type: String,
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
        expriedTime: {
            type: Date,
            required: true,
        },
        tokenCode: {
            type: String,
            required: true,
        },
        email: {
            type: String,
        },
        requestUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
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
        collection: process.env.DB_PREFIX + 'request_forgot_password',
        timestamps: true,
    },
);
