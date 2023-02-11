import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { FiltersDto } from '~base/dtos/filters.dto';

export class UserActivityFilterDto extends FiltersDto {
    @Expose()
    @ApiProperty()
    readonly name: string;
}
