import { IsString, IsEmail, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterPlayerDto {
    @ApiProperty({
        description: 'Username of the player',
        example: 'player123',
    })
    @IsString()
    userName: string;

    @ApiProperty({ description: 'Name of the player', example: 'John' })
    @IsString()
    name: string;

    @ApiProperty({ description: 'Last name of the player', example: 'Doe' })
    @IsString()
    lastName: string;

    @ApiProperty({
        description: 'Email of the player',
        example: 'player@example.com',
    })
    @IsEmail()
    email: string;

    @ApiProperty({ description: 'Age of the player', example: 25 })
    @IsInt()
    age: number;

    @ApiProperty({
        description: 'Position of the player',
        example: 'Midfielder',
    })
    @IsString()
    position: string;

    @ApiProperty({
        description: 'ID of the country',
        example: 2, // Cambiado a número
    })
    @IsInt() // Cambiado a IsInt
    countryId: number;

    @ApiProperty({
        description: 'ID of the team',
        example: 1,
    })
    @IsInt()
    teamId: number;

    @ApiProperty({
        description: 'Password of the player',
        example: 'securePassword123',
    })
    @IsString()
    password: string; // Agregar validación de contraseña si es necesario
}
