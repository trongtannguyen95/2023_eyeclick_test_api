import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { FiltersDto } from '../../base/dtos/filters.dto';

export class AclDto {
    @Expose()
    @ApiProperty({ required: true })
    readonly module: string;
    @Expose()
    @ApiProperty({ required: true })
    readonly resource: string;
    @Expose()
    @ApiProperty({ required: true })
    readonly action: string;
    @Expose()
    @ApiProperty({ required: true })
    readonly permission: number;
}

export class RoleCreateDto {
    @Expose()
    @ApiProperty({ required: true })
    readonly name: string;
    @Expose()
    @ApiProperty({ required: true })
    readonly description: string;
    @Expose()
    @ApiProperty({ required: false, isArray: true, type: AclDto })
    @Type(() => AclDto)
    readonly acls: AclDto[];
}

export class RoleUpdateDto {
    @Expose()
    @ApiProperty({ required: true })
    readonly name: string;
    @Expose()
    @ApiProperty({ required: true })
    readonly description: string;
    @Expose()
    @ApiProperty({ required: false, isArray: true, type: AclDto })
    @Type(() => AclDto)
    readonly acls: AclDto[];
}

export class RoleCreateAclDto {
    @Expose()
    @ApiProperty({ required: true })
    @IsNotEmpty()
    readonly role_id: string;
    @Expose()
    @ApiProperty({ required: true, type: AclDto })
    @Type(() => AclDto)
    @IsNotEmpty()
    readonly acl: AclDto[];
}

export class RoleUpdateAclDto {
    @Expose()
    @ApiProperty({ required: true })
    @IsNotEmpty()
    readonly role_id: string;
    @Expose()
    @ApiProperty({ required: true, type: AclDto })
    @Type(() => AclDto)
    @IsNotEmpty()
    readonly acl: AclDto;
}

export class RoleDeleteAclDto {
    @Expose()
    @ApiProperty({ required: true })
    @IsNotEmpty()
    readonly role_id: string;
    @Expose()
    @ApiProperty({ required: true, type: AclDto })
    @Type(() => AclDto)
    @IsNotEmpty()
    readonly acl_delete: AclDto[];
}

export class RoleFilterDto extends FiltersDto {}
