import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { IsAlreadyExist } from '../../base/decorators/is-already-exist.decocator';
import { FiltersDto } from '../../base/dtos/filters.dto';
import { UsersService } from '../services/users.service';

export class TokenDto {
    @Expose()
    @ApiProperty({ required: true })
    readonly userName: string;
    @Expose()
    @ApiProperty({ required: true, type: 'string', format: 'password' })
    readonly password: string;
}

export class ForgotDto {
    @Expose()
    @ApiProperty({ required: true })
    @IsEmail()
    readonly email: string;
}

export class RenewPassWordDto {
    @Expose()
    @ApiProperty({ required: true })
    @IsNotEmpty()
    readonly password: string;

    @Expose()
    @ApiProperty({ required: true })
    @IsNotEmpty()
    readonly confirmPassword: string;

    @Expose()
    @ApiProperty({ required: true })
    @IsNotEmpty()
    readonly tokenCode: string;

    @Expose()
    @ApiProperty({ required: true })
    @IsEmail()
    readonly email: string;
}

export class CreateAccountDto {
    @Expose()
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsAlreadyExist({ service: UsersService, key: 'username' })
    readonly username: string;

    @Expose()
    @ApiProperty({ required: true })
    @IsNotEmpty()
    readonly password: string;

    @Expose()
    @ApiProperty({ required: true })
    @IsNotEmpty()
    readonly confirmPassword: string;

    @Expose()
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsAlreadyExist({ service: UsersService, key: 'phone' })
    readonly phone: string;

    @Expose()
    @ApiProperty({ required: true })
    @IsNotEmpty()
    readonly address: string;

    @Expose()
    @ApiProperty({ required: true })
    @IsEmail()
    @IsAlreadyExist({ service: UsersService, key: 'email' })
    readonly email: string;
}

export class ValidateAccountDto {
    @Expose()
    @ApiProperty({ required: true })
    @IsNotEmpty()
    readonly tokenCode: string;

    @Expose()
    @ApiProperty({ required: true })
    @IsEmail()
    readonly email: string;
}

export class AddToBlackListDto {
    @Expose()
    @ApiProperty({ required: true })
    @IsNotEmpty()
    readonly token: string;
}
export class TokenFilterDto extends FiltersDto {}
