import { ApiProperty } from '@nestjs/swagger';
import { FiltersDto } from '../../base/dtos/filters.dto';
import { IsAlreadyExist } from '../../base/decorators/is-already-exist.decocator';
import { SettingsService } from '../services/settings.service';
import { Expose } from 'class-transformer';

export class SettingCreateDto {
    @Expose()
    @ApiProperty()
    name?: string;
    @Expose()
    @ApiProperty({ required: false })
    description?: string;
    @Expose()
    @ApiProperty()
    @IsAlreadyExist({ service: SettingsService, key: 'key' })
    key: string;
    @Expose()
    @ApiProperty()
    value: string;
}

export class SettingUpdateDto {
    @Expose()
    @ApiProperty()
    id?: string;
    @Expose()
    @ApiProperty()
    name?: string;
    @Expose()
    @ApiProperty({ required: false })
    description?: string;
    @IsAlreadyExist({ service: SettingsService, key: 'key', isUpdate: true })
    @Expose()
    @ApiProperty()
    key: string;
    @Expose()
    @ApiProperty()
    value: string;
}

export class SettingsFiltersDto extends FiltersDto {}
