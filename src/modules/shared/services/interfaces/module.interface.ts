import { Document } from 'mongoose';

export interface IModule extends Document {
    readonly name?: string;
    readonly description?: string;
    readonly deleted?: number;
    readonly status?: number;
    readonly created?: string;
    readonly modified?: string;
}
