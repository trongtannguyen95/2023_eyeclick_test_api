import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { FiltersDto } from '../../base/dtos/filters.dto';

export class ResourceCreateDto {
    @Expose()
    @ApiProperty()
    name?: string;
    @Expose()
    @ApiProperty({ required: false })
    description?: string;
    @Expose()
    @ApiProperty({ required: true })
    moduleId?: string;
}

export class ResourceUpdateDto {
    @Expose()
    @ApiProperty()
    name?: string;
    @Expose()
    @ApiProperty({ required: false })
    description?: string;
    @Expose()
    @ApiProperty({ required: true })
    moduleId?: string;
}

export class ResourcesFiltersDto extends FiltersDto {}
