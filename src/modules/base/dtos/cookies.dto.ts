import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CookiesDto {
    @Expose()
    @ApiProperty({ required: true })
    readonly zoanid?: string;

    @Expose()
    @ApiProperty({ required: true })
    readonly name?: string;

    @Expose()
    @ApiProperty({ required: true })
    readonly value?: string;
}
