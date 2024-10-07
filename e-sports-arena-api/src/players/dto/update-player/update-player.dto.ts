import { IsString, IsEmail, IsInt, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePlayerDto {
    @ApiProperty({
        description: 'Username of the player',
        example: 'player123',
        required: false,
    })
    @IsOptional()
    @IsString()
    userName?: string;

    @ApiProperty({
        description: 'Name of the player',
        example: 'John',
        required: false,
    })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiProperty({
        description: 'Last name of the player',
        example: 'Doe',
        required: false,
    })
    @IsOptional()
    @IsString()
    lastName?: string;

    @ApiProperty({
        description: 'Email of the player',
        example: 'player@example.com',
        required: false,
    })
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiProperty({
        description: 'Age of the player',
        example: 25,
        required: false,
    })
    @IsOptional()
    @IsInt()
    age?: number;

    @ApiProperty({
        description: 'Position of the player',
        example: 'Midfielder',
        required: false,
    })
    @IsOptional()
    @IsString()
    position?: string;

    @ApiProperty({
        description: 'ID of the country',
        example: '2',
        required: false,
    })
    @IsOptional()
    @IsUUID()
    countryId?: string;

    @ApiProperty({
        description: 'ID of the team',
        example: '1',
        required: false,
    })
    @IsOptional()
    @IsInt()
    teamId?: number;

    @ApiProperty({
        description: 'Password of the player',
        example: 'securePassword123',
        required: false,
    })
    @IsOptional()
    @IsString()
    password?: string; // Add password validation if needed
}
