import { ApiProperty } from '@nestjs/swagger';
import { TournamentEntity } from 'src/tournament/entities/tournament.entity';

export class CreateTournamentResponseDto {
    @ApiProperty({ description: 'HTTP status code', example: 201 })
    status: number;

    @ApiProperty({
        description: 'Response message',
        example: 'Tournament created successfully',
    })
    message: string;

    @ApiProperty({ description: 'Created tournament data' })
    data: TournamentEntity;
}
