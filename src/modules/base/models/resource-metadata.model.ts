export class SearchOptionModel {
    operator?: 'lt' | 'eq' | 'neq' | 'gt' | 'gte' | 'lte' | 'in' | 'nin' | 'between' | 'like' | 'inLike' | 'exists';
    mapFilters?: any;
    exists?: boolean;
}

export class FieldModel {
    name: string;
    type: 'boolean' | 'number' | 'text' | 'datetime' | 'object' | 'array' | 'relate';
    format?: string;
    relate_select?: any;
    list: boolean;
    search: boolean;
    searchOption?: SearchOptionModel;
    create: boolean;
    update: boolean;
    detail: boolean;
}

export interface ResourceMetaData<M extends string = string, R extends string = string, A extends string = string, AA extends A = A> {
    module: M;
    resource: R;
    softDelete?: boolean;
    fields?: FieldModel[];
    actions?: A[];
    auditActions?: 'all' | AA[];
}

export class ObjectsFieldDefination {
    [field: string]: FieldModel;
}

export function defineResourceMetaData<M extends string, R extends string, A extends string, AA extends A>(
    metadata: ResourceMetaData<M, R, A, AA>,
) {
    return metadata;
}
