import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TournamentEntity } from './entities/tournament.entity';
import { CreateTournamentController } from './create-tournament/create-tournament.controller';
import { CreateTournamentService } from './create-tournament/create-tournament.service';
import { UpdateTournamentController } from './update-tournament/update-tournament.controller';
import { UpdateTournamentService } from './update-tournament/update-tournament.service';
import { TeamEntity } from 'src/common/entities/team.entity';
import { CountryEntity } from 'src/common/entities/country.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([TournamentEntity, CountryEntity, TeamEntity]),
    ],
    controllers: [CreateTournamentController, UpdateTournamentController],
    providers: [CreateTournamentService, UpdateTournamentService],
})
export class TournamentModule {}
