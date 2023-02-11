import { FiltersDto } from '../../base/dtos/filters.dto';
import { BaseApiProperty } from '../../base/decorators/api-model-property.decorator';

import { Expose } from 'class-transformer';
export class UploadDto {
    @Expose()
    @BaseApiProperty({ required: true, type: 'file', in: 'formData' })
    readonly file: Buffer;
    @Expose()
    @BaseApiProperty({ required: false, type: 'string', in: 'formData' })
    readonly fileInfo: string;
}

export class UploadMultiFileDto {
    @Expose()
    @BaseApiProperty({ required: true, type: 'array', items: { type: 'string', format: 'binary' }, in: 'formData' })
    readonly files: Buffer[];
    @Expose()
    @BaseApiProperty({ required: false, type: 'string', in: 'formData' })
    readonly fileInfo: string;
}

export class ActionsFiltersDto extends FiltersDto {}
