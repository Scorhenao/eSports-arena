import { PaginationPlayersService } from './player-pagination.service';
import { PlayerResponseDto } from './../dto/player-pagination/player-response.dto';
import {
    Controller,
    Get,
    Query,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { PaginationDto } from '../dto/pagination.dto';
import { PaginationResponseDto } from '../dto/pagination-response.dto';

@ApiTags('players')
@Controller('players')
export class PaginationPlayersController {
    constructor(
        private readonly paginationPlayersService: PaginationPlayersService,
    ) {}

    @Get()
    @UsePipes(new ValidationPipe({ transform: true })) // Transforma y valida
    @ApiQuery({
        name: 'page',
        required: false,
        type: Number,
        description: 'Page number to fetch (defaults to 1)',
        example: 1,
    })
    @ApiQuery({
        name: 'limit',
        required: false,
        type: Number,
        description: 'Number of items per page (defaults to 10)',
        example: 10,
    })
    @ApiQuery({
        name: 'team',
        required: false,
        type: String,
        description: 'Team name to filter players',
        example: 'Team A',
    })
    @ApiQuery({
        name: 'country',
        required: false,
        type: String,
        description: 'Country name to filter players',
        example: 'USA',
    })
    @ApiQuery({
        name: 'position',
        required: false,
        type: String,
        description: 'Position to filter players',
        example: 'Forward',
    })
    @ApiResponse({
        status: 200,
        description: 'Paginated list of players with optional filters',
        type: PaginationResponseDto,
    })
    async getPlayers(
        @Query() paginationDto: PaginationDto,
        @Query('team') team?: string,
        @Query('country') country?: string,
        @Query('position') position?: string,
    ): Promise<PaginationResponseDto<PlayerResponseDto>> {
        return this.paginationPlayersService.getPlayers(paginationDto, {
            team,
            country,
            position,
        });
    }
}
