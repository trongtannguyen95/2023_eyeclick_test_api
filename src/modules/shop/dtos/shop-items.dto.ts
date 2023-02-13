import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { FiltersDto } from '../../base/dtos/filters.dto';

export class ShopItemUpdateDto {

    @Expose()
    @ApiProperty({ required: true })
    @IsNotEmpty()
    readonly name: string;

    @Expose()
    @ApiProperty({ required: false })
    readonly description: string;

    @Expose()
    @ApiProperty({ required: true })
    @IsNotEmpty()
    readonly image: string;

    @Expose()
    @ApiProperty({ required: false })
    readonly status: number;

    @Expose()
    @ApiProperty({ required: true })
    readonly price: number;

}
export class ShopItemCreateDto {

    @Expose()
    @ApiProperty({ required: true })
    @IsNotEmpty()
    readonly name: string;

    @Expose()
    @ApiProperty({ required: false })
    readonly description: string;

    @Expose()
    @ApiProperty({ required: true })
    @IsNotEmpty()
    readonly image: string;

    @Expose()
    @ApiProperty({ required: false })
    readonly status: number;

    @Expose()
    @ApiProperty({ required: true })
    readonly price: number;

}
export class ShopItemsFilterDto extends FiltersDto { }
