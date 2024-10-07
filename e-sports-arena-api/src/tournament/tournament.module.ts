import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TournamentEntity } from './entities/tournament.entity';
import { CreateTournamentController } from './create-tournament/create-tournament.controller';
import { CreateTournamentService } from './create-tournament/create-tournament.service';

@Module({
    imports: [TypeOrmModule.forFeature([TournamentEntity])],
    controllers: [CreateTournamentController],
    providers: [CreateTournamentService],
})
export class TournamentModule {}
