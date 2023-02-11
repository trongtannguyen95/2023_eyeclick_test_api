import { Document, ObjectId } from 'mongoose';

export interface IUserActivity extends Document {
    readonly module?: string;
    readonly resource?: string;
    readonly action?: string;
    readonly resourceId?: ObjectId;
    readonly userId?: ObjectId;
    readonly relatedId?: ObjectId;
    readonly message?: string;
    readonly data?: any;
    readonly userAgent?: Record<string, any>;
    readonly ipv4?: string;
    readonly created?: string;
    readonly modified?: string;
}
