import {
    Injectable,
    NotFoundException,
    ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlayerEntity } from 'src/players/entities/player.entity';
import { UpdatePlayerDto } from './../dto/update-player/update-player.dto';
import { UpdatePlayerResponseDto } from './../dto/update-player/update-player-response.dto';

@Injectable()
export class UpdatePlayerService {
    constructor(
        @InjectRepository(PlayerEntity)
        private readonly playerRepository: Repository<PlayerEntity>,
    ) {}

    async updatePlayer(
        id: string,
        updatePlayerDto: UpdatePlayerDto,
    ): Promise<UpdatePlayerResponseDto> {
        const player = await this.playerRepository.findOne({ where: { id } });

        if (!player) {
            throw new NotFoundException(`Player with ID ${id} not found.`);
        }

        // Verifica si el username o el email están siendo utilizados por otro jugador
        const existingPlayer = await this.playerRepository.findOne({
            where: [
                { userName: updatePlayerDto.userName },
                { email: updatePlayerDto.email },
            ],
        });

        if (existingPlayer && existingPlayer.id !== id) {
            throw new ConflictException('Username or email already in use.');
        }

        // Actualiza los campos del jugador
        Object.assign(player, updatePlayerDto);

        // Guarda el jugador actualizado en la base de datos
        await this.playerRepository.save(player);

        // Prepara el DTO de respuesta
        const response: UpdatePlayerResponseDto = {
            status: 200,
            data: player,
            message: 'Player updated successfully.',
        };

        return response;
    }
}
