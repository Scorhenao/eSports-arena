import { Controller, Delete, Param } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { DeleteTournamentService } from './delete-tournament.service';
import { DeleteTournamentResponseDto } from './../dto/delete-tournament/delete-tournament-response.dto'; // Asegúrate de tener la ruta correcta

@ApiTags('Tournaments')
@Controller('tournaments')
export class DeleteTournamentController {
    constructor(
        private readonly deleteTournamentService: DeleteTournamentService,
    ) {}

    @Delete(':id')
    @ApiResponse({
        status: 200,
        description: 'Tournament deleted successfully',
        type: DeleteTournamentResponseDto,
    })
    async deleteTournament(
        @Param('id') id: number,
    ): Promise<DeleteTournamentResponseDto> {
        return this.deleteTournamentService.deleteTournament(id);
    }
}
