import { CreateTournamentDto } from './../dto/create-tournament/create-tournament.dto';
import { CreateTournamentResponseDto } from './../dto/create-tournament/create-tournament-response.dto';
import { Controller, Post, Body } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTournamentService } from './create-tournament.service';

@ApiTags('Tournaments')
@Controller('tournaments')
export class CreateTournamentController {
    constructor(
        private readonly createTournamentService: CreateTournamentService,
    ) {}

    @Post('create')
    @ApiResponse({
        status: 201,
        description: 'Tournament created successfully',
        type: CreateTournamentResponseDto,
    })
    async createTournament(
        @Body() createTournamentDto: CreateTournamentDto,
    ): Promise<CreateTournamentResponseDto> {
        return this.createTournamentService.createTournament(
            createTournamentDto,
        );
    }
}
