import { IsNotEmpty, IsNumberString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BaseApiProperty } from '../decorators/api-model-property.decorator';
import { Expose } from 'class-transformer';

@Expose()
export class SearchsDto {
    @ApiProperty()
    name?: string;
    status?: number;
    deleted?: number;
    [field: string]: any;
}

@Expose()
export class SortDto {
    @ApiProperty()
    sortKey: string;
    @ApiProperty({ required: false, enum: ['ASC', 'DESC'] })
    sortValue: string;
}

export class FiltersDto {
    @Expose()
    @ApiProperty({ required: true, default: 10 })
    @IsNotEmpty()
    @IsNumberString()
    limit?: number;
    @Expose()
    @ApiProperty({ required: true, default: 0 })
    @IsNotEmpty()
    @IsNumberString()
    page?: number;
    @Expose()
    @BaseApiProperty({
        required: false,
        type: ['object'],
        description: JSON.stringify([{ sortKey: 'createdAt', sortValue: 'DESC' }]),
        example: [null],
    })
    sorts?: SortDto[];
    @Expose()
    @BaseApiProperty({
        required: false,
        type: 'object',
        style: 'deepObject',
        explode: true,
        example: {},
    })
    filters?: SearchsDto;
}

export class FilterReportDto {
    @Expose()
    @BaseApiProperty({
        required: false,
        type: [Object],
        description: JSON.stringify([{ sortKey: 'createdAt', sortValue: 'DESC' }]),
        example: [null],
    })
    sorts?: SortDto[];
    @Expose()
    @BaseApiProperty({
        required: false,
        type: 'object',
        style: 'deepObject',
        explode: true,
        example: {},
    })
    filters?: SearchsDto;
}
