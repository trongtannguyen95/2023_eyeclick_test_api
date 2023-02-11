import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { FiltersDto } from '../../base/dtos/filters.dto';

export class ModuleCreateDto {
    @Expose()
    @ApiProperty()
    name?: string;
    @Expose()
    @ApiProperty({ required: false })
    description?: string;
}

export class ModuleUpdateDto {
    @Expose()
    @ApiProperty()
    name?: string;
    @Expose()
    @ApiProperty({ required: false })
    description?: string;
}

export class ModulesFiltersDto extends FiltersDto {}
