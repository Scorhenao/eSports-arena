import { PlayerEntity } from 'src/players/entities/player.entity';
import { PlayerResponseDto } from './../dto/player-pagination/player-response.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationDto } from '../dto/pagination.dto';
import { PaginationResponseDto } from '../dto/pagination-response.dto';

@Injectable()
export class PaginationPlayersService {
    constructor(
        @InjectRepository(PlayerEntity)
        private readonly playerRepository: Repository<PlayerEntity>,
    ) {}

    async getPlayers(
        paginationDto: PaginationDto,
        filters: { team?: string; country?: string; position?: string },
    ): Promise<PaginationResponseDto<PlayerResponseDto>> {
        const { page, limit } = paginationDto;
        const skip = (page - 1) * limit;

        // Construir el query con filtros opcionales
        const query = this.playerRepository
            .createQueryBuilder('player')
            .leftJoinAndSelect('player.country', 'country')
            .leftJoinAndSelect('player.team', 'team')
            .skip(skip)
            .take(limit);

        if (filters.team) {
            query.andWhere('team.name = :team', { team: filters.team });
        }
        if (filters.country) {
            query.andWhere('country.name = :country', {
                country: filters.country,
            });
        }
        if (filters.position) {
            query.andWhere('player.position = :position', {
                position: filters.position,
            });
        }

        const [players, totalCount] = await query.getManyAndCount();

        const data = players.map((player) => ({
            id: player.id,
            userName: player.userName,
            name: player.name,
            lastName: player.lastName,
            email: player.email,
            age: player.age,
            position: player.position,
            country: player.country.name,
            team: player.team.name,
        }));

        return {
            data,
            page,
            limit,
            totalCount,
            totalPages: Math.ceil(totalCount / limit),
        };
    }
}
