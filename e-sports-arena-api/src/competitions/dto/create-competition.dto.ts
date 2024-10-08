import { IsNotEmpty, IsNumber, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCompetitionDto {
    @ApiProperty({ description: 'ID of the tournament' })
    @IsNotEmpty()
    @IsNumber()
    tournamentId: number;

    @ApiProperty({
        description: 'Number of teams to include in the competition',
    })
    @IsNotEmpty()
    @IsInt()
    numberOfTeams: number;
}
