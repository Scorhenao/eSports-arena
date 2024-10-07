import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TournamentEntity } from '../entities/tournament.entity';
import { DeleteTournamentResponseDto } from './../dto/delete-tournament/delete-tournament-response.dto';

@Injectable()
export class DeleteTournamentService {
    constructor(
        @InjectRepository(TournamentEntity)
        private readonly tournamentRepository: Repository<TournamentEntity>,
    ) {}

    async deleteTournament(id: number): Promise<DeleteTournamentResponseDto> {
        const tournament = await this.tournamentRepository.findOne({
            where: { id },
        });

        if (!tournament) {
            throw new NotFoundException('Tournament not found');
        }

        await this.tournamentRepository.remove(tournament);

        const response: DeleteTournamentResponseDto = {
            status: 200,
            message: 'Tournament deleted successfully.',
            data: id, // Return the deleted id
        };

        return response;
    }
}
