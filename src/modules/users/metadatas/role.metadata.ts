import { defineResourceMetaData } from '~base/models/resource-metadata.model';

export const RolesResourceMetadata = defineResourceMetaData({
    module: 'users',
    resource: 'roles',
    softDelete: true,
    auditActions: [],
    actions: ['list', 'detail', 'create', 'update', 'delete', 'export', 'import', 'update-acl'],
    fields: [
        {
            name: 'name',
            type: 'text',
            list: true,
            detail: true,
            create: true,
            update: true,
            search: true,
            searchOption: {
                operator: 'like',
            },
        },
        {
            name: 'description',
            type: 'text',
            list: true,
            detail: true,
            create: true,
            update: true,
            search: false,
            searchOption: {
                operator: 'eq',
            },
        },
        {
            name: 'deleted',
            type: 'number',
            list: true,
            detail: true,
            create: true,
            update: true,
            search: true,
            searchOption: {
                operator: 'eq',
            },
        },
        {
            name: 'status',
            type: 'number',
            list: true,
            detail: true,
            create: true,
            update: true,
            search: true,
            searchOption: {
                operator: 'eq',
            },
        },
        {
            name: 'acls',
            type: 'array',
            list: true,
            detail: true,
            create: true,
            update: true,
            search: false,
            searchOption: {
                operator: 'eq',
            },
        },
        {
            name: 'created',
            type: 'relate',
            relate_select: 'username name email',
            list: true,
            detail: true,
            create: true,
            update: true,
            search: true,
            searchOption: {
                operator: 'eq',
            },
        },
        {
            name: 'createdAt',
            type: 'datetime',
            list: true,
            detail: true,
            create: true,
            update: true,
            search: true,
            searchOption: {
                mapFilters: {
                    start: 'startDate',
                    end: 'endDate',
                },
                operator: 'between',
            },
        },
    ],
});
