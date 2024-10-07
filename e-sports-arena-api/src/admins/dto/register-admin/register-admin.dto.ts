import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class RegisterAdminDto {
    @ApiProperty({ example: 'adminuser' })
    @IsString()
    name: string;

    @ApiProperty({ example: 'admin@example.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'securePassword123' })
    @IsString()
    password: string; // Add validation if necessary
}
