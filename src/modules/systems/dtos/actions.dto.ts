import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { FiltersDto } from '../../base/dtos/filters.dto';

export class ActionCreateDto {
    @Expose()
    @ApiProperty()
    name?: string;
    @Expose()
    @ApiProperty({ required: false })
    description?: string;
    @Expose()
    @ApiProperty({ required: true })
    resourceId?: string;
}

export class ActionUpdateDto {
    @Expose()
    @ApiProperty()
    name?: string;
    @Expose()
    @ApiProperty({ required: false })
    description?: string;
    @Expose()
    @ApiProperty({ required: true })
    resourceId?: string;
}

export class ActionsFiltersDto extends FiltersDto {}
