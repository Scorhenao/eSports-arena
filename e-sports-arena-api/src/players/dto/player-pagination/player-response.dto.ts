import { ApiProperty } from '@nestjs/swagger';

export class PlayerResponseDto {
    @ApiProperty({
        description: 'UUID of player',
        example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
    })
    id: string;

    @ApiProperty({
        description: 'name of user player',
        example: 'player123',
    })
    userName: string;

    @ApiProperty({ description: 'Name of player', example: 'John' })
    name: string;

    @ApiProperty({ description: 'Last name of player', example: 'Doe' })
    lastName: string;

    @ApiProperty({
        description: 'email of player',
        example: 'player@example.com',
    })
    email: string;

    @ApiProperty({ description: 'Player age', example: 25 })
    age: number;

    @ApiProperty({ description: 'player position', example: 'Forward' })
    position: string;

    @ApiProperty({ description: 'country of player', example: 'USA' })
    country: string;

    @ApiProperty({
        description: 'team of player',
        example: 'Team A',
    })
    team: string;
}
