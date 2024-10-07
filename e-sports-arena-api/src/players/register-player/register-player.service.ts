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
import { v4 as uuidv4 } from 'uuid'; // Import UUID v4 for generating unique IDs
import * as bcrypt from 'bcrypt'; // Import bcrypt for password hashing

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

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear una nueva entidad PlayerEntity
        const player = this.playerRepository.create({
            id: uuidv4(), // Set a unique ID
            userName,
            name,
            lastName,
            email,
            age,
            position,
            country,
            team,
            password: hashedPassword, // Use hashed password
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
