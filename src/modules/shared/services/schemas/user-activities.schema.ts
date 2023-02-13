import { Schema } from 'mongoose';


export const UserActivitiesSchema = new Schema(
    {
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
        message: {
            type: String,
            required: false,
        },
        resourceId: {
            type: Schema.Types.ObjectId,
            required: false,
        },
        data: {
            type: Schema.Types.Mixed,
            required: false,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'Users',
        },
        relatedId: {
            type: Schema.Types.ObjectId,
            required: false,
        },
        userAgent: {
            type: Schema.Types.Mixed,
            required: false,
        },
        ipv4: {
            type: String,
            required: false,
        },
        created: {
            type: Schema.Types.ObjectId,
            ref: 'Users',
        },
        modified: {
            type: Schema.Types.ObjectId,
            ref: 'Users',
        },
    },
    {
        collection: 'user_activities',
        timestamps: true,
    },
);
