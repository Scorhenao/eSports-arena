import { UpdateTournamentDto } from './../dto/update-tournament/update-torunament.dto';
import { TeamEntity } from 'src/common/entities/team.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TournamentEntity } from '../entities/tournament.entity';
import { CreateTournamentResponseDto } from './../dto/create-tournament/create-tournament-response.dto';
import { CountryEntity } from 'src/common/entities/country.entity'; // Asegúrate de importar tu entidad

@Injectable()
export class UpdateTournamentService {
    constructor(
        @InjectRepository(TournamentEntity)
        private readonly tournamentRepository: Repository<TournamentEntity>,
        @InjectRepository(CountryEntity) // Inyecta el repositorio de Country
        private readonly countryRepository: Repository<CountryEntity>,
        @InjectRepository(TeamEntity) // Inyecta el repositorio de Team
        private readonly teamRepository: Repository<TeamEntity>,
    ) {}

    async updateTournament(
        id: number,
        updateTournamentDto: UpdateTournamentDto,
    ): Promise<CreateTournamentResponseDto> {
        const tournament = await this.tournamentRepository.findOne({
            where: { id },
            relations: ['teams', 'country'], // Asegúrate de cargar las relaciones necesarias
        });

        if (!tournament) {
            throw new NotFoundException('Tournament not found');
        }

        const { name, countryId, teamIds } = updateTournamentDto;

        if (name) {
            tournament.name = name;
        }
        if (countryId) {
            const country = await this.countryRepository.findOne({
                where: { id: countryId },
            });
            if (!country) {
                throw new NotFoundException('Country not found');
            }
            tournament.country = country; // Asignación correcta
        }
        if (teamIds) {
            const teams = await this.teamRepository.findByIds(teamIds);
            tournament.teams = teams; // Asignación correcta
        }

        await this.tournamentRepository.save(tournament);

        const response: CreateTournamentResponseDto = {
            status: 200,
            message: 'Tournament updated successfully.',
            data: tournament,
        };

        return response;
    }
}
