import { ApiProperty } from '@nestjs/swagger';
import { FiltersDto } from '../../base/dtos/filters.dto';
import { IsEmail } from 'class-validator';
import { IsAlreadyExist } from '../../base/decorators/is-already-exist.decocator';
import { UsersService } from '../services/users.service';
import { Expose } from 'class-transformer';

export class ChangeUserPasswordDto {
    @Expose()
    @ApiProperty({ required: false })
    readonly currentPassword: string;
    @Expose()
    @ApiProperty({ required: false })
    readonly newPassword: string;
    @Expose()
    @ApiProperty({ required: false })
    readonly confirmPassword: string;
}
export class UserRegisterDto {
    @Expose()
    @ApiProperty({ required: false })
    readonly name: string;
    @Expose()
    @ApiProperty({ required: true })
    @IsAlreadyExist({ service: UsersService, key: 'username' })
    readonly username: string;
    @Expose()
    @ApiProperty({ required: true })
    password: string;
    @Expose()
    @ApiProperty({ required: true })
    confirmPassword: string;
    @Expose()
    @ApiProperty({ required: false })
    readonly phone: string;
    @IsEmail()
    @IsAlreadyExist({ service: UsersService, key: 'email' })
    @Expose()
    @ApiProperty({ required: true })
    readonly email: string;
    @Expose()
    @ApiProperty({ required: false })
    readonly address: string;
}
export class UserCreateDto {
    @Expose()
    @ApiProperty({ required: false })
    readonly name: string;
    @Expose()
    @ApiProperty({ required: false })
    readonly description?: string;
    @Expose()
    @ApiProperty({ required: true })
    @IsAlreadyExist({ service: UsersService, key: 'username' })
    readonly username: string;
    @Expose()
    @ApiProperty({ required: true })
    password: string;
    @Expose()
    @ApiProperty({ required: true })
    readonly phone: string;
    @IsEmail()
    @IsAlreadyExist({ service: UsersService, key: 'email' })
    @Expose()
    @ApiProperty({ required: true })
    readonly email: string;
    @Expose()
    @ApiProperty({ required: true })
    readonly address: string;
    @Expose()
    @ApiProperty({ required: true })
    readonly roleId: string;
    @Expose()
    @ApiProperty({ required: false })
    readonly isAdministrator: number;
    @Expose()
    @ApiProperty({ required: false })
    readonly status: number;
}

export class UserUpdateDto {
    @Expose()
    @ApiProperty({ required: false })
    readonly id: string;
    @Expose()
    @ApiProperty({ required: false })
    readonly name: string;
    @Expose()
    @ApiProperty({ required: false })
    @Expose()
    readonly description?: string;
    @Expose()
    @ApiProperty({ required: true })
    readonly phone: string;
    @IsEmail()
    @IsAlreadyExist({ service: UsersService, key: 'email', isUpdate: true })
    @Expose()
    @ApiProperty({ required: true })
    readonly email: string;
    @Expose()
    @ApiProperty({ required: true })
    readonly address: string;
    @Expose()
    @ApiProperty({ required: true })
    readonly roleId: string;
    @Expose()
    @ApiProperty({ required: false })
    readonly isAdministrator: number;
    @Expose()
    @ApiProperty({ required: true })
    password: string;
    @Expose()
    @ApiProperty({ required: false })
    readonly status: number;
}

export class UserFilterDto extends FiltersDto { }
