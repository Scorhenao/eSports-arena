import { IsInt, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTournamentDto {
    @ApiProperty({
        description: 'Tournament name',
        example: 'Champions League',
        required: false,
    })
    @IsString()
    @IsOptional()
    name?: string;

    @ApiProperty({
        description: 'ID of the country where the tournament takes place',
        example: 1,
        required: false,
    })
    @IsInt()
    @IsOptional()
    countryId?: number;

    @ApiProperty({
        description: 'IDs of the teams participating in the tournament',
        example: [1, 2],
        required: false,
    })
    @IsInt({ each: true })
    @IsOptional()
    teamIds?: number[];
}
