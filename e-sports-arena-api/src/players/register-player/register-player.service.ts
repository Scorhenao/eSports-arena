import { PlayerEntity } from 'src/players/entities/player.entity';
import { RegisterPlayerDto } from './../dto/register-player/register-player.dto';
import { RegisterPlayerResponseDto } from './../dto/register-player/register-player-response.dto';
import {
    Injectable,
    NotFoundException,
    ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CountryEntity } from 'src/common/entities/country.entity';
import { TeamEntity } from 'src/common/entities/team.entity';

@Injectable()
export class RegisterPlayerService {
    constructor(
        @InjectRepository(PlayerEntity)
        private readonly playerRepository: Repository<PlayerEntity>,
        @InjectRepository(CountryEntity)
        private readonly countryRepository: Repository<CountryEntity>,
        @InjectRepository(TeamEntity)
        private readonly teamRepository: Repository<TeamEntity>,
    ) {}

    async registerPlayer(
        registerPlayerDto: RegisterPlayerDto,
    ): Promise<RegisterPlayerResponseDto> {
        const {
            userName,
            name,
            lastName,
            email,
            age,
            position,
            countryId,
            teamId,
            password,
        } = registerPlayerDto;

        // Verificar si el país existe
        const country = await this.countryRepository.findOne({
            where: { id: countryId },
        });
        if (!country) {
            throw new NotFoundException(
                `Country with ID ${countryId} not found.`,
            );
        }

        // Verificar si el equipo existe
        const team = await this.teamRepository.findOne({
            where: { id: teamId },
        });
        if (!team) {
            throw new NotFoundException(`Team with ID ${teamId} not found.`);
        }

        // Verificar si el username o email ya están en uso
        const existingPlayer = await this.playerRepository.findOne({
            where: [{ userName }, { email }],
        });

        if (existingPlayer) {
            throw new ConflictException('Username or email already in use.');
        }

        // Crear una nueva entidad PlayerEntity
        const player = this.playerRepository.create({
            userName,
            name,
            lastName,
            email,
            age,
            position,
            country, // Se establece la relación con el país
            team, // Se establece la relación con el equipo
            password, // Asegúrate de encriptar la contraseña antes de guardarla
        });

        // Guardar el jugador en la base de datos
        try {
            await this.playerRepository.save(player);
        } catch (error) {
            console.error('Error saving player:', error);
            throw new ConflictException('Failed to register player.');
        }

        // Preparar el DTO de respuesta
        const response: RegisterPlayerResponseDto = {
            status: 201,
            data: player,
            message: 'Player registered successfully.',
        };

        return response;
    }
}
