import { Document } from 'mongoose';

export interface IUserToken extends Document {
    readonly name?: string;
    readonly description?: string;
    readonly deleted?: number;
    readonly status?: number;
    readonly token?: string;
    readonly tokenHash?: string;
    readonly iat?: number;
    readonly exp?: number;
    readonly ip?: string;
    readonly agentInfo?: any;
    readonly created?: string;
    readonly modified?: string;
}
