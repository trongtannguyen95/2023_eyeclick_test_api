import { Document } from 'mongoose';

export interface IAcl extends Document {
    readonly name?: string;
    readonly description?: string;
    readonly deleted?: number;
    readonly status?: number;
    readonly module?: string;
    readonly resource?: string;
    readonly action?: string;
    readonly permission?: number;
    readonly created?: string;
    readonly modified?: string;
}
