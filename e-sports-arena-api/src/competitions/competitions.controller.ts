import { Controller, Post, Body, Param, Get, UseGuards } from '@nestjs/common';
import { CompetitionsService } from './competitions.service';
import { CreateCompetitionDto } from './dto/create-competition.dto';
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CompetitionEntity } from './entities/competition.entity';
import { AddPointsDto } from './dto/add-points.dto';
import { ApiKeyGuard } from 'src/common/auth/guards/api-key.guard';

@ApiTags('competitions')
@Controller('competitions')
export class CompetitionsController {
    constructor(private readonly competitionsService: CompetitionsService) {}

    @UseGuards(ApiKeyGuard)
    @ApiHeader({
        name: 'x-api-key',
        description: 'API Key',
        required: true,
    })
    @Post()
    @ApiResponse({
        status: 201,
        description: 'Competition created successfully.',
        type: CompetitionEntity,
    })
    async createCompetition(
        @Body() createCompetitionDto: CreateCompetitionDto,
    ): Promise<CompetitionEntity> {
        return this.competitionsService.createCompetition(createCompetitionDto);
    }

    @UseGuards(ApiKeyGuard)
    @ApiHeader({
        name: 'x-api-key',
        description: 'API Key',
        required: true,
    })
    @Post(':competitionId/points')
    @ApiResponse({
        status: 200,
        description: 'Points added successfully.',
    })
    async addPoints(
        @Param('competitionId') competitionId: number,
        @Body() addPointsDto: AddPointsDto,
    ) {
        return await this.competitionsService.addPoints(
            competitionId,
            addPointsDto,
        );
    }

    @UseGuards(ApiKeyGuard)
    @ApiHeader({
        name: 'x-api-key',
        description: 'API Key',
        required: true,
    })
    @Post(':competitionId/result')
    @ApiResponse({
        status: 200,
        description: 'Match result defined successfully.',
    })
    async defineMatchResult(
        @Param('competitionId') competitionId: number,
        @Body() body: { isDraw?: boolean }, // Opcional, según la lógica
    ) {
        return await this.competitionsService.defineMatchResult(
            competitionId,
            body.isDraw, // Pasar solo lo que necesites
        );
    }

    @UseGuards(ApiKeyGuard)
    @ApiHeader({
        name: 'x-api-key',
        description: 'API Key',
        required: true,
    })
    // Nuevo endpoint para obtener todos los ganadores
    @Get('winners')
    @ApiResponse({
        status: 200,
        description: 'List of all competition winners.',
    })
    async getWinners() {
        return await this.competitionsService.getWinners();
    }

    @UseGuards(ApiKeyGuard)
    @ApiHeader({
        name: 'x-api-key',
        description: 'API Key',
        required: true,
    })
    @Get('losers')
    @ApiResponse({
        status: 200,
        description: 'Competition found successfully.',
        type: CompetitionEntity,
    })
    async getCompetition() {
        return await this.competitionsService.getLosers();
    }
}
