import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompetitionsService } from './competitions.service';
import { CompetitionsController } from './competitions.controller';
import { CompetitionEntity } from './entities/competition.entity';
import { TournamentEntity } from 'src/tournament/entities/tournament.entity';
import { TeamEntity } from 'src/common/entities/team.entity';
import { ResultEntity } from 'src/results/entities/result.entity'; // Si necesitas los resultados también

@Module({
    imports: [
        TypeOrmModule.forFeature([
            CompetitionEntity,
            TournamentEntity,
            TeamEntity,
            ResultEntity, // Incluido solo si es necesario para otras operaciones
        ]),
    ],
    controllers: [CompetitionsController],
    providers: [CompetitionsService],
    exports: [CompetitionsService], // Exportar el servicio si se necesita en otros módulos
})
export class CompetitionsModule {}
