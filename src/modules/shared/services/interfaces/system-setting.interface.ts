import { Document } from 'mongoose';

export interface ISystemSetting extends Document {
    readonly name?: string;
    readonly description?: string;
    readonly deleted?: number;
    readonly status?: number;
    readonly configKey?: string;
    readonly configSetting?: string;
    readonly created?: string;
    readonly modified?: string;
}
