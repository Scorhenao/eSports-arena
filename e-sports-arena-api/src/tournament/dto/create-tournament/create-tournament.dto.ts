import { IsString, IsInt, IsNotEmpty, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTournamentDto {
    @ApiProperty({
        description: 'Tournament name',
        example: 'Champions League',
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'ID of the country where the tournament takes place',
        example: 1,
    })
    @IsInt()
    countryId: number;

    @ApiProperty({
        description:
            'Array of IDs of the teams participating in the tournament',
        example: [1, 2],
    })
    @IsArray()
    @IsInt({ each: true })
    teamIds: number[];
}
