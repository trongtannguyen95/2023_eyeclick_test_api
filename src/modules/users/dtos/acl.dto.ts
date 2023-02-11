import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { FiltersDto } from '../../base/dtos/filters.dto';

export class AclCreateDto {
    @Expose()
    @ApiProperty()
    readonly name: string;
    @Expose()
    @ApiProperty()
    readonly description: string;
    @Expose()
    @ApiProperty()
    readonly module: string;
    @Expose()
    @ApiProperty()
    readonly resource: string;
    @Expose()
    @ApiProperty()
    readonly action: string;
    @Expose()
    @ApiProperty()
    readonly permisson: number;
}

export class AclUpdateDto {
    @Expose()
    @ApiProperty()
    readonly name: string;
    @Expose()
    @ApiProperty()
    readonly description: string;
    @Expose()
    @ApiProperty()
    readonly module: string;
    @Expose()
    @ApiProperty()
    readonly resource: string;
    @Expose()
    @ApiProperty()
    readonly action: string;
    @Expose()
    @ApiProperty()
    readonly permisson: number;
}

export class AclFilterDto extends FiltersDto {
    @Expose()
    @ApiProperty()
    readonly name: string;
}
