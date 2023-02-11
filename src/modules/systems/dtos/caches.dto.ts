import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CacheDto {
    @Expose()
    @ApiProperty({ required: true })
    @IsNotEmpty()
    readonly willCard: string;
}

export class DetailCacheDto {
    @Expose()
    @ApiProperty({ required: true })
    @IsNotEmpty()
    readonly key: string;
}
