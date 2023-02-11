import { Logger } from '@nestjs/common';
import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import { app } from '../../../main';
import { IBaseService } from '../models/mservice.interface';

export interface IAlreadyExistServiceContext {
    service: any;
    key?: string | string[];
    isUpdate?: boolean;
}
@ValidatorConstraint({ async: true })
export class IsAlreadyExistConstraint implements ValidatorConstraintInterface {
    async validate(value: any, args: ValidationArguments) {
        // console.log(args);
        if (value) {
            const [context] = args.constraints;
            const serviceCheck = app.get(context.service) as IBaseService<any>;
            if (serviceCheck) {
                let searchQuery = {};
                if (Array.isArray(context.key)) {
                    searchQuery = {};
                    for (const key of context.key) {
                        searchQuery[key] = args.object[key];
                    }
                } else {
                    searchQuery = {
                        [context.key]: value,
                    };
                }
                const listRecordExits = await serviceCheck.findAll(searchQuery);
                if (listRecordExits && listRecordExits.length > 0) {
                    if (context.isUpdate) {
                        const recordExits = listRecordExits[0];
                        const recordToSave = args.object;
                        // Logger.debug(args, 'IsAlreadyExistConstraint');
                        const check = this.checkForUpdate(recordExits, recordToSave);
                        // Logger.debug(check, 'IsAlreadyExistConstraint');
                        return check;
                    }
                    return false;
                } else {
                    return true;
                }
            } else {
                Logger.warn('Cant not get servive ' + context.service.name || 'Not found name', IsAlreadyExistConstraint.name);
            }
        }
        return true;
    }
    checkForUpdate(recordExits: any, recordToSave) {
        Logger.log(recordToSave['id']);
        const recordExitsId = String(recordExits['_id']) || recordExits['id'];
        Logger.log(recordExitsId);
        if (recordToSave['id'] !== recordExitsId) {
            return false;
        } else {
            return true;
        }
    }
    defaultMessage() {
        // here you can provide default error message if validation failed
        return '$property:$value already exists.';
    }
}

export function IsAlreadyExist(context?: IAlreadyExistServiceContext, validationOptions?: ValidationOptions) {
    return (object: object, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [context],
            validator: IsAlreadyExistConstraint,
        });
    };
}
