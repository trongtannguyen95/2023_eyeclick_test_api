import { Document } from 'mongoose';

export interface IRole extends Document {
    readonly name?: string;
    readonly description?: string;
    readonly deleted?: number;
    readonly status?: number;
    readonly acls?: object[];
    readonly created?: string;
    readonly modified?: string;
}
