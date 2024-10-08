import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompetitionsService } from './competitions.service';
import { CompetitionsController } from './competitions.controller';
import { CompetitionEntity } from './entities/competition.entity';
import { TournamentEntity } from 'src/tournament/entities/tournament.entity';
import { TeamEntity } from 'src/common/entities/team.entity';
import { ResultEntity } from 'src/results/entities/result.entity'; // Si necesitas los resultados también
import { CompetitionResultEntity } from 'src/common/entities/competition-result.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            CompetitionEntity,
            TournamentEntity,
            TeamEntity,
            ResultEntity,
            CompetitionResultEntity,
        ]),
    ],
    controllers: [CompetitionsController],
    providers: [CompetitionsService],
    exports: [CompetitionsService],
})
export class CompetitionsModule {}
