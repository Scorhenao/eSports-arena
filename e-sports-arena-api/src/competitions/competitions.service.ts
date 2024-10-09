import {
    Injectable,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompetitionEntity } from './entities/competition.entity';
import { TournamentEntity } from 'src/tournament/entities/tournament.entity';
import { TeamEntity } from 'src/common/entities/team.entity';
import { CreateCompetitionDto } from './dto/create-competition.dto';
import { ResultEntity } from 'src/results/entities/result.entity';
import { AddPointsDto } from './dto/add-points.dto';
import { CompetitionResultEntity } from 'src/common/entities/competition-result.entity';

@Injectable()
export class CompetitionsService {
    constructor(
        @InjectRepository(CompetitionEntity)
        private readonly competitionRepository: Repository<CompetitionEntity>,
        @InjectRepository(TournamentEntity)
        private readonly tournamentRepository: Repository<TournamentEntity>,
        @InjectRepository(TeamEntity)
        private readonly teamRepository: Repository<TeamEntity>,
        @InjectRepository(ResultEntity)
        private readonly resultRepository: Repository<ResultEntity>,
        @InjectRepository(CompetitionResultEntity)
        private readonly competitionResultRepository: Repository<CompetitionResultEntity>,
    ) {}

    async createCompetition(
        createCompetitionDto: CreateCompetitionDto,
    ): Promise<CompetitionEntity> {
        const { tournamentId, numberOfTeams } = createCompetitionDto;

        const tournament = await this.tournamentRepository.findOne({
            where: { id: tournamentId },
            relations: ['teams'],
        });

        if (!tournament) {
            throw new NotFoundException(
                `Tournament with ID ${tournamentId} not found.`,
            );
        }

        if (tournament.teams.length < numberOfTeams) {
            throw new BadRequestException(
                'Not enough teams in the tournament to create this competition',
            );
        }

        const competition = new CompetitionEntity();
        competition.tournament = tournament;

        const savedCompetition =
            await this.competitionRepository.save(competition);

        // Crear resultados para los equipos, ejecutando promesas en paralelo
        const results = tournament.teams.slice(0, numberOfTeams).map((team) => {
            const result = new ResultEntity();
            result.competition = savedCompetition;
            result.team = team;
            result.points = 0;
            result.name = `${team.name} Result`;
            return this.resultRepository.save(result);
        });

        await Promise.all(results); // Guardar todos los resultados en paralelo

        return savedCompetition;
    }

    async addPoints(competitionId: number, addPointsDto: AddPointsDto) {
        const competition = await this.competitionRepository.findOne({
            where: { id: competitionId },
            relations: ['tournament'],
        });

        if (!competition) {
            throw new NotFoundException(
                `Competition with ID ${competitionId} not found.`,
            );
        }

        const promises = addPointsDto.teamPoints.map(async (teamPoint) => {
            const result = await this.resultRepository.findOne({
                where: {
                    competition: { id: competitionId },
                    team: { id: teamPoint.teamId },
                },
            });

            if (!result) {
                throw new NotFoundException(
                    `Result not found for team ID ${teamPoint.teamId}.`,
                );
            }

            result.points += teamPoint.points;
            return this.resultRepository.save(result);
        });

        await Promise.all(promises); // Procesar todas las actualizaciones en paralelo

        return { message: 'Points added successfully.' };
    }

    async defineMatchResult(competitionId: number, isDraw: boolean = false) {
        const competition = await this.competitionRepository.findOne({
            where: { id: competitionId },
            relations: ['results'],
        });

        if (!competition) {
            throw new NotFoundException(
                `Competition with ID ${competitionId} not found.`,
            );
        }

        // Obtener todos los resultados de la competición
        const results = await this.resultRepository.find({
            where: { competition: { id: competitionId } },
            relations: ['team'],
        });

        if (results.length === 0) {
            throw new NotFoundException(
                'No results found for this competition.',
            );
        }

        // Determinar el ganador y el perdedor basándose en los puntos
        let winner = null;
        let loser = null;

        if (!isDraw) {
            // Filtrar los resultados para obtener el equipo con más puntos
            winner = results.reduce((prev, current) => {
                return prev.points > current.points ? prev : current;
            });

            // Filtrar el perdedor
            loser = results.reduce((prev, current) => {
                return prev.points < current.points ? prev : current;
            });

            if (winner.id === loser.id) {
                throw new BadRequestException(
                    'Winner and loser cannot be the same team.',
                );
            }
        }

        // Guardar el resultado de la competición
        const competitionResult = new CompetitionResultEntity();
        competitionResult.competition = competition;
        competitionResult.winner = winner?.team; // Guardar el equipo ganador
        competitionResult.loser = loser?.team; // Guardar el equipo perdedor
        competitionResult.isDraw = isDraw;

        await this.competitionResultRepository.save(competitionResult);

        return { message: 'Match result defined successfully.' };
    }

    async getWinners(): Promise<any> {
        const results = await this.competitionResultRepository.find({
            relations: ['competition', 'winner', 'loser'],
        });

        if (!results.length) {
            throw new NotFoundException('No competition results found.');
        }

        return results.map((result) => {
            const { competition, winner, loser, isDraw } = result;

            if (!competition || (!winner && !loser)) {
                return {
                    competitionId: 'N/A',
                    competitionName: 'N/A',
                    result: 'No valid result available',
                };
            }

            if (isDraw) {
                return {
                    competitionId: competition.id || 'N/A',
                    competitionName: competition?.tournament?.name || 'N/A',
                    result: 'Draw',
                    teams: [
                        {
                            id: winner?.id || 'N/A',
                            name: winner?.name || 'N/A',
                        },
                        { id: loser?.id || 'N/A', name: loser?.name || 'N/A' },
                    ],
                };
            }

            return {
                competitionId: competition.id || 'N/A',
                competitionName: competition?.tournament?.name || 'N/A',
                winner: {
                    id: winner?.id || 'N/A',
                    name: winner?.name || 'N/A',
                },
            };
        });
    }

    async getLosers(): Promise<any> {
        const results = await this.competitionResultRepository.find({
            relations: ['competition', 'winner', 'loser'],
        });

        if (!results.length) {
            throw new NotFoundException('No competition results found.');
        }

        return results.map((result) => {
            const { competition, loser } = result;

            if (!competition || !loser) {
                return {
                    competitionId: 'N/A',
                    competitionName: 'N/A',
                    loser: 'No valid loser available',
                };
            }

            return {
                competitionId: competition.id || 'N/A',
                competitionName: competition?.tournament?.name || 'N/A',
                loser: {
                    id: loser?.id || 'N/A',
                    name: loser?.name || 'N/A',
                },
            };
        });
    }
}
