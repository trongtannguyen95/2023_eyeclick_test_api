import { Document } from 'mongoose';

export interface IAction extends Document {
    readonly name?: string;
    readonly description?: string;
    readonly deleted?: number;
    readonly status?: number;
    readonly created?: string;
    readonly modified?: string;
    readonly resourceId?: string;
}
