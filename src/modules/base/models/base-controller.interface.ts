import { Response } from 'express';
import { ResourceMetaData } from './resource-metadata.model';
import { UserModel } from '~users/models/user.model';
import { Hookable } from 'hookable';
import { ObjectId } from 'mongodb';

export type Slice<T extends Record<string, any>> = { [P in keyof T]: Pick<T, P> }[keyof T];
export type TBaseControllerFactory = () => Slice<IBaseController>;

export interface IBaseControllerHooks {
    retrieved: (record: any, user?: UserModel) => any;
    creating: (entity: any, user?: UserModel) => any;
    created: (record: any, user?: UserModel) => any;
    updating: (entity: any, recordInfo: any, user?: UserModel) => any;
    updated: (record: any, user?: UserModel) => any;
    saving: (entity: any, recordInfo?: any, user?: UserModel) => any;
    saved: (record: any, user?: UserModel) => any;
    deleting: (record: any, user?: UserModel) => any;
    deleted: (record: any, user?: UserModel) => any;
}

export interface IBaseAuditData {
    action: string;
    resourceId?: string | ObjectId;
    userId?: string | ObjectId;
    relatedId?: ObjectId;
    data?: any;
    message?: string;
    ua?: string;
    ipv4?: string;
}

export interface IBaseController {
    readonly metaData?: ResourceMetaData;
    readonly hooks?: Hookable<IBaseControllerHooks>;
    addHook?: Hookable<IBaseControllerHooks>['hook'];
    list(...args: any): Promise<Response>;
    detail(...args: any): Promise<Response>;
    create(...args: any): Promise<Response>;
    update(...args: any): Promise<Response>;
    delete(...args: any): Promise<Response>;
    checkAuth(user?: UserModel, action?: string): any;
    checkAuthRecord(user?: UserModel, createdUser?: string | Partial<UserModel>, permission?: number): any;
    audit(args: IBaseAuditData): void;
}

export type BaseConstructor = new (...args) => IBaseController;
