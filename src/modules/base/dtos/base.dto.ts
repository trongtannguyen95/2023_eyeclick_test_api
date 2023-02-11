import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class BaseDto {
    [field: string]: string;
}

export class DeleteMultiDto {
    @Expose()
    @ApiProperty({ required: true })
    readonly listIds?: [string];
}
