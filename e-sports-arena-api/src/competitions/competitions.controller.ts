import { Controller, Post, Body, Param } from '@nestjs/common';
import { CompetitionsService } from './competitions.service';
import { CreateCompetitionDto } from './dto/create-competition.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CompetitionEntity } from './entities/competition.entity';
import { AddPointsDto } from './dto/add-points.dto';

@ApiTags('competitions')
@Controller('competitions')
export class CompetitionsController {
    constructor(private readonly competitionsService: CompetitionsService) {}

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
}
