import { Injectable, NotFoundException } from '@nestjs/common';
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

        // Buscar el torneo
        const tournament = await this.tournamentRepository.findOne({
            where: { id: tournamentId },
            relations: ['teams'], // Cargar los equipos del torneo
        });

        if (!tournament) {
            throw new NotFoundException(
                `Tournament with ID ${tournamentId} not found`,
            );
        }

        // Verificar que hay suficientes equipos
        if (tournament.teams.length < numberOfTeams) {
            throw new Error(
                'Not enough teams in the tournament to create this competition',
            );
        }

        // Crear una nueva competencia
        const competition = new CompetitionEntity();
        competition.tournament = tournament;

        // Guardar la competencia
        const savedCompetition =
            await this.competitionRepository.save(competition);

        // Crear resultados para cada equipo
        for (const team of tournament.teams.slice(0, numberOfTeams)) {
            const result = new ResultEntity();
            result.competition = savedCompetition; // Asignar la competencia
            result.team = team; // Asignar el equipo
            result.points = 0; // Inicializar puntos
            result.name = `${team.name} Result`; // Asignar un valor al campo name

            // Guardar el resultado
            await this.resultRepository.save(result);
        }

        return savedCompetition; // Devuelve la competencia creada
    }

    async addPoints(competitionId: number, addPointsDto: AddPointsDto) {
        const competition = await this.competitionRepository.findOne({
            where: { id: competitionId },
            relations: ['tournament'], // Asegúrate de cargar el torneo asociado
        });

        if (!competition) {
            throw new NotFoundException(
                `Competition with ID ${competitionId} not found.`,
            );
        }

        for (const teamPoint of addPointsDto.teamPoints) {
            const result = await this.resultRepository.findOne({
                where: {
                    competition: { id: competitionId },
                    team: { id: teamPoint.teamId },
                },
            });

            console.log(`Searching for result for team ID ${teamPoint.teamId}`); // Agregar log

            if (result) {
                result.points += teamPoint.points;
                await this.resultRepository.save(result);
            } else {
                throw new NotFoundException(
                    `Result not found for team ID ${teamPoint.teamId}.`,
                );
            }
        }

        return { message: 'Points added successfully.' };
    }

    async defineMatchResult(
        competitionId: number,
        winnerId: number,
        loserId: number,
        isDraw: boolean = false, // Nuevo parámetro para empate
    ) {
        const competition = await this.competitionRepository.findOne({
            where: { id: competitionId },
            relations: ['results'],
        });

        if (!competition) {
            throw new NotFoundException(
                `Competition with ID ${competitionId} not found.`,
            );
        }

        const winner = await this.teamRepository.findOne({
            where: { id: winnerId },
        });
        const loser = await this.teamRepository.findOne({
            where: { id: loserId },
        });

        if (!winner || !loser) {
            throw new NotFoundException('Winner or Loser team not found.');
        }

        const competitionResult = new CompetitionResultEntity();
        competitionResult.competition = competition;
        competitionResult.winner = winner;
        competitionResult.loser = loser;
        competitionResult.isDraw = isDraw; // Indicar si fue empate

        await this.competitionResultRepository.save(competitionResult);

        return { message: 'Match result defined successfully.' };
    }

    async getWinners(): Promise<any> {
        const results = await this.competitionResultRepository.find({
            relations: ['competition', 'winner', 'loser'], // Cargar todas las relaciones necesarias
        });

        if (!results.length) {
            throw new NotFoundException('No competition results found.');
        }

        return results.map((result) => {
            const { competition, winner, loser, isDraw } = result;

            // Verificar si el resultado, competencia y equipos están definidos
            if (!competition || (!winner && !loser)) {
                return {
                    competitionId: 'N/A',
                    competitionName: 'N/A',
                    result: 'No valid result available',
                };
            }

            // Si hay un empate
            if (isDraw) {
                return {
                    competitionId: competition?.id || 'N/A',
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

            // Caso normal donde hay un ganador
            return {
                competitionId: competition?.id || 'N/A',
                competitionName: competition?.tournament?.name || 'N/A',
                winner: {
                    id: winner?.id || 'N/A',
                    name: winner?.name || 'N/A',
                },
            };
        });
    }
}
