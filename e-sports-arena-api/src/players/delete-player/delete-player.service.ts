import { DeletePlayerResponseDto } from '../dto/delete-player/delete-player-response.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlayerEntity } from 'src/players/entities/player.entity';

@Injectable()
export class DeletePlayerService {
    constructor(
        @InjectRepository(PlayerEntity)
        private readonly playerRepository: Repository<PlayerEntity>,
    ) {}

    async deletePlayer(id: string): Promise<DeletePlayerResponseDto> {
        const player = await this.playerRepository.findOne({ where: { id } });

        if (!player) {
            throw new NotFoundException(`Player with ID ${id} not found.`);
        }

        // Elimina el jugador de la base de datos
        await this.playerRepository.remove(player);

        // Prepara el DTO de respuesta
        const response: DeletePlayerResponseDto = {
            status: 200,
            message: 'Player deleted successfully.',
        };

        return response;
    }
}
