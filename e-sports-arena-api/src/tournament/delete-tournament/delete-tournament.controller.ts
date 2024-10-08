import { Controller, Delete, Param, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DeleteTournamentService } from './delete-tournament.service';
import { DeleteTournamentResponseDto } from './../dto/delete-tournament/delete-tournament-response.dto';
import { JwtAuthGuard } from './../../common/auth/guards/jwt-auth.guard';
import { AdminGuard } from './../../common/auth/guards/admin.guard'; // Import the AdminGuard
import { ApiKeyGuard } from 'src/common/auth/guards/api-key.guard';

@ApiTags('Tournaments')
@Controller('tournaments')
export class DeleteTournamentController {
    constructor(
        private readonly deleteTournamentService: DeleteTournamentService,
    ) {}

    @UseGuards(ApiKeyGuard)
    @ApiHeader({
        name: 'x-api-key',
        description: 'API Key',
        required: true,
    })
    @Delete(':id')
    @UseGuards(JwtAuthGuard, AdminGuard) // Apply both guards to restrict access
    @ApiResponse({
        status: 200,
        description: 'Tournament deleted successfully',
        type: DeleteTournamentResponseDto,
    })
    @ApiResponse({
        status: 401, // Unauthorized status
        description: 'Unauthorized', // Description for unauthorized access
    })
    @ApiResponse({
        status: 403, // Forbidden status
        description:
            'Access denied. You do not have permission to access this resource.',
    })
    async deleteTournament(
        @Param('id') id: number,
    ): Promise<DeleteTournamentResponseDto> {
        return this.deleteTournamentService.deleteTournament(id);
    }
}
