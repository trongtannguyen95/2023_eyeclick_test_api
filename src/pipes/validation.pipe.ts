import { iterate } from 'iterare';
import { Optional } from '@nestjs/common/decorators';
import { Injectable } from '@nestjs/common/decorators/core';
import { HttpStatus } from '@nestjs/common/enums/http-status.enum';
import { ArgumentMetadata, BadRequestException, ValidationError } from '@nestjs/common/index';
import { ClassTransformOptions } from '@nestjs/common/interfaces/external/class-transform-options.interface';
import { ValidatorOptions } from '@nestjs/common/interfaces/external/validator-options.interface';
import { PipeTransform } from '@nestjs/common/interfaces/features/pipe-transform.interface';
import { Type } from '@nestjs/common/interfaces/type.interface';
import { loadPackage } from '@nestjs/common/utils/load-package.util';
import { isNil } from '@nestjs/common/utils/shared.utils';
import { pickBy } from 'lodash';

export interface ValidationPipeOptions extends ValidatorOptions {
    transform?: boolean;
    disableErrorMessages?: boolean;
    transformOptions?: ClassTransformOptions;
    exceptionFactory?: (errors: ValidationError[]) => any;
    validateCustomDecorators?: boolean;
    expectedType?: Type<any>;
}

let classValidator: any = {};
let classTransformer: any = {};

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    protected isTransformEnabled: boolean;
    protected isDetailedOutputDisabled?: boolean;
    protected validatorOptions: ValidatorOptions;
    protected transformOptions: ClassTransformOptions;
    protected expectedType: Type<any>;
    protected exceptionFactory: (errors: ValidationError[]) => any;
    protected validateCustomDecorators: boolean;
    protected errorHttpStatusCode: number;
    constructor(@Optional() options?: ValidationPipeOptions) {
        options = options || {};
        const { transform, disableErrorMessages, expectedType, transformOptions, validateCustomDecorators, ...validatorOptions } = options;

        this.isTransformEnabled = !!transform;
        this.validatorOptions = validatorOptions;
        this.transformOptions = transformOptions;
        this.isDetailedOutputDisabled = disableErrorMessages;
        this.validateCustomDecorators = validateCustomDecorators || false;
        this.errorHttpStatusCode = HttpStatus.BAD_REQUEST;
        this.expectedType = expectedType;
        this.exceptionFactory = options.exceptionFactory || this.createExceptionFactory();

        classValidator = loadPackage('class-validator', 'ValidationPipe', () => require('class-validator'));
        classTransformer = loadPackage('class-transformer', 'ValidationPipe', () => require('class-transformer'));
    }

    public async transform(value: any, metadata: ArgumentMetadata) {
        const metatype = this.expectedType || metadata.metatype;
        if (!metatype || !this.toValidate(metadata)) {
            return this.isTransformEnabled ? this.transformPrimitive(value, metadata) : value;
        }
        const originalValue = value;
        value = this.toEmptyIfNil(value);

        const isNill = value !== originalValue;

        const isPrimitive = this.isPrimitive(value);
        this.stripProtoKeys(value);
        // Logger.log(metadata, ' metadata');
        // Logger.log(value, ' value');
        let entity = classTransformer.plainToClass(metatype, value, this.transformOptions);
        // Logger.log(entity, ' entity');

        const originalEntity = entity;

        const isCtorNotEqual = entity.constructor !== metatype;

        if (isCtorNotEqual && !isPrimitive) {
            entity.constructor = metatype;
        } else if (isCtorNotEqual) {
            // when "entity" is a primitive value, we have to temporarily
            // replace the entity to perform the validation against the original
            // metatype defined inside the handler
            entity = { constructor: metatype };
        }

        const errors = await classValidator.validate(entity, this.validatorOptions);
        if (errors.length > 0) {
            throw this.exceptionFactory(errors);
        }
        if (isPrimitive) {
            // if the value is a primitive value and the validation process has been successfully completed
            // we have to revert the original value passed through the pipe
            entity = originalEntity;
        }

        if (this.isTransformEnabled) {
            return pickBy(entity, (v) => v !== undefined);
        }
        if (isNill) {
            // if the value was originally undefined or null, revert it back
            return originalValue;
        }
        const ret = Object.keys(this.validatorOptions).length > 0 ? classTransformer.classToPlain(entity, this.transformOptions) : value;
        return ret;
    }

    public createExceptionFactory() {
        return (validationErrors: ValidationError[] = []) => {
            const errors = this.flattenValidationErrors(validationErrors);
            throw new BadRequestException(errors);
        };
    }

    private toValidate(metadata: ArgumentMetadata): boolean {
        const { metatype, type } = metadata;
        if (type === 'custom' && !this.validateCustomDecorators) {
            return false;
        }
        const types = [String, Boolean, Number, Array, Object, Buffer];
        return !types.some((t) => metatype === t) && !isNil(metatype);
    }

    private transformPrimitive(value: any, metadata: ArgumentMetadata) {
        if (!metadata.data) {
            // leave top-level query/param objects unmodified
            return value;
        }
        const { type, metatype } = metadata;
        if (type !== 'param' && type !== 'query') {
            return value;
        }
        if (metatype === Boolean) {
            return value === true || value === 'true';
        }
        if (metatype === Number) {
            return +value;
        }
        return value;
    }

    private toEmptyIfNil<T = any, R = any>(value: T): R | Record<string, any> {
        return isNil(value) ? {} : value;
    }

    private stripProtoKeys(value: Record<string, any>) {
        delete value.__proto__;
        const keys = Object.keys(value);
        iterate(keys)
            .filter((key) => typeof value[key] === 'object' && value[key])
            .forEach((key) => this.stripProtoKeys(value[key]));
    }

    private isPrimitive(value: unknown): boolean {
        return ['number', 'boolean', 'string'].includes(typeof value);
    }

    private flattenValidationErrors(validationErrors: ValidationError[]): string[] {
        return iterate(validationErrors)
            .map((error) => this.mapChildrenToValidationErrors(error))
            .flatten()
            .filter((item) => !!item.constraints)
            .map((item) => Object.values(item.constraints))
            .flatten()
            .toArray();
    }

    private mapChildrenToValidationErrors(error: ValidationError): ValidationError[] {
        if (!(error.children && error.children.length)) {
            return [error];
        }
        const validationErrors = [];
        for (const item of error.children) {
            if (item.children && item.children.length) {
                validationErrors.push(...this.mapChildrenToValidationErrors(item));
            }
            validationErrors.push(this.prependConstraintsWithParentProp(error, item));
        }
        return validationErrors;
    }

    private prependConstraintsWithParentProp(parentError: ValidationError, error: ValidationError): ValidationError {
        const constraints = {};
        // tslint:disable-next-line: forin
        for (const key in error.constraints) {
            constraints[key] = `${parentError.property}.${error.constraints[key]}`;
        }
        return {
            ...error,
            constraints,
        };
    }
}
