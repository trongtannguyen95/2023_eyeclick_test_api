import { Document } from 'mongoose';

export interface IRequestForgotPassword extends Document {
    readonly name?: string;
    readonly description?: string;
    readonly deleted?: number;
    readonly status?: number; // 0 new, 1 send mail success, 2 send mail error, 3 : active
    readonly expriedTime?: Date;
    readonly tokenCode?: string;
    readonly requestUser?: string;
    readonly email?: string;
    readonly created?: string;
    readonly modified?: string;
}
