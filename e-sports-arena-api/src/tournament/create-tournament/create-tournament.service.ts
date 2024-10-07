import { CreateTournamentDto } from './../dto/create-tournament/create-tournament.dto';
import { CreateTournamentResponseDto } from './../dto/create-tournament/create-tournament-response.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TournamentEntity } from '../entities/tournament.entity';

@Injectable()
export class CreateTournamentService {
    constructor(
        @InjectRepository(TournamentEntity)
        private readonly tournamentRepository: Repository<TournamentEntity>,
    ) {}

    async createTournament(
        createTournamentDto: CreateTournamentDto,
    ): Promise<CreateTournamentResponseDto> {
        const { name, countryId, teamIds } = createTournamentDto;

        const tournament = this.tournamentRepository.create({
            name,
            country: { id: countryId }, // Set the country relation
            teams: teamIds.map((id) => ({ id })), // Set the teams relation
        });

        await this.tournamentRepository.save(tournament);

        const response: CreateTournamentResponseDto = {
            status: 201,
            message: 'Tournament created successfully.',
            data: tournament,
        };

        return response;
    }
}
