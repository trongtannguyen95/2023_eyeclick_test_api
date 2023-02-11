import { Document } from 'mongoose';

export interface IResource extends Document {
    readonly name?: string;
    readonly description?: string;
    readonly deleted?: number;
    readonly status?: number;
    readonly moduleId?: string;
    readonly created?: string;
    readonly modified?: string;
}
