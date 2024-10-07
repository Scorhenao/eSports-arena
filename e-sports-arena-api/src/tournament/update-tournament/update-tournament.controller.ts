import { UpdateTournamentDto } from '../dto/update-tournament/update-tournament.dto';
import { Controller, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UpdateTournamentService } from './update-tournament.service';
import { CreateTournamentResponseDto } from './../dto/create-tournament/create-tournament-response.dto';
import { JwtAuthGuard } from './../../common/auth/guards/jwt-auth.guard';
import { AdminGuard } from './../../common/auth/guards/admin.guard'; // Import the AdminGuard

@ApiTags('Tournaments')
@ApiBearerAuth() // Indicate that this endpoint requires a bearer token
@Controller('tournaments')
export class UpdateTournamentController {
    constructor(
        private readonly updateTournamentService: UpdateTournamentService,
    ) {}

    @Patch(':id')
    @UseGuards(JwtAuthGuard, AdminGuard) // Apply both guards to restrict access
    @ApiResponse({
        status: 200,
        description: 'Tournament updated successfully',
        type: CreateTournamentResponseDto,
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized', // Description for unauthorized access
    })
    @ApiResponse({
        status: 403,
        description:
            'Access denied. You do not have permission to access this resource.',
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
