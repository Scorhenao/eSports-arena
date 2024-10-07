import { UpdateTournamentDto } from './../dto/update-tournament/update-torunament.dto';
import { Controller, Patch, Param, Body } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateTournamentService } from './update-tournament.service';
import { CreateTournamentResponseDto } from './../dto/create-tournament/create-tournament-response.dto';

@ApiTags('Tournaments')
@Controller('tournaments')
export class UpdateTournamentController {
    constructor(
        private readonly updateTournamentService: UpdateTournamentService,
    ) {}

    @Patch(':id')
    @ApiResponse({
        status: 200,
        description: 'Tournament updated successfully',
        type: CreateTournamentResponseDto,
    })
    async updateTournament(
        @Param('id') id: number,
        @Body() updateTournamentDto: UpdateTournamentDto,
    ): Promise<CreateTournamentResponseDto> {
        return this.updateTournamentService.updateTournament(
            id,
            updateTournamentDto,
        );
    }
}
