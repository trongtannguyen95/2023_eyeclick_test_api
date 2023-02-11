import { defineResourceMetaData } from '~base/models/resource-metadata.model';

export const SettingsResourceMetadata = defineResourceMetaData({
    module: 'systems',
    resource: 'settings',
    softDelete: true,
    auditActions: [],
    actions: ['list', 'detail', 'create', 'update', 'delete'],
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
            name: 'key',
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
            name: 'value',
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
        {
            name: 'updatedAt',
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
