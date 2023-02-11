import { DECORATORS } from '@nestjs/swagger/dist/constants';
import { getTypeIsArrayTuple } from '@nestjs/swagger/dist/decorators/helpers';
import { SwaggerEnumType } from '@nestjs/swagger/dist/types/swagger-enum.type';
import { isUndefined, negate, pickBy } from 'lodash';

export const createBasePropertyDecorator = (metakey, metadata): PropertyDecorator => {
    return (target: object, propertyKey: string) => {
        //  Logger.log(target);
        const properties = Reflect.getMetadata(DECORATORS.API_MODEL_PROPERTIES_ARRAY, target) || [];
        Reflect.defineMetadata(DECORATORS.API_MODEL_PROPERTIES_ARRAY, [...properties, `:${propertyKey}`], target);
        Reflect.defineMetadata(
            metakey,
            {
                type: Reflect.getMetadata('design:type', target, propertyKey),
                ...pickBy(metadata, negate(isUndefined)),
            },
            target,
            propertyKey,
        );
    };
};

export const BaseApiProperty = (
    metadata: {
        description?: string;
        required?: any;
        type?: any;
        schema?: any;
        isArray?: boolean;
        collectionFormat?: string;
        default?: any;
        enum?: SwaggerEnumType;
        format?: string;
        style?: string;
        properties?: any;
        explode?: boolean;
        items?: any;
        in?: string;
        multipleOf?: number;
        maximum?: number;
        exclusiveMaximum?: boolean;
        minimum?: number;
        exclusiveMinimum?: boolean;
        maxLength?: number;
        minLength?: number;
        pattern?: string;
        maxItems?: number;
        minItems?: number;
        uniqueItems?: boolean;
        maxProperties?: number;
        minProperties?: number;
        readOnly?: boolean;
        nullable?: boolean;
        xml?: any;
        example?: any;
    } = {},
): PropertyDecorator => {
    const [type, isArray] = getTypeIsArrayTuple(metadata.type, metadata.isArray);
    return createBasePropertyDecorator(DECORATORS.API_MODEL_PROPERTIES, {
        ...metadata,
        type,
        isArray,
    });
};
