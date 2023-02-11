import { Document } from 'mongoose';

export interface ISetting extends Document {
    readonly key?: string;
    readonly value?: string;
    readonly status?: number;
    readonly created?: string;
    readonly modified?: string;
}
