import { Document } from 'mongoose';

export interface IUser extends Document {
    readonly name?: string | any;
    readonly description?: string | any;
    readonly deleted?: string | any;
    readonly status?: number | any;
    readonly created?: string | any;
    readonly modified?: string | any;
    readonly username?: string | any;
    readonly password?: string | any;
    readonly phone?: string | any;
    readonly email?: string | any;
    readonly address?: string | any;
    readonly isAdministrator?: number | any;
    readonly shoppingCard?: object;
}
