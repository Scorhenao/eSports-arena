import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginPlayerDto {
    @ApiProperty({ example: 'player@example.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'securePassword123' })
    @IsString()
    password: string;
}
