import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TournamentEntity } from './entities/tournament.entity';
import { CreateTournamentController } from './create-tournament/create-tournament.controller';
import { CreateTournamentService } from './create-tournament/create-tournament.service';
import { UpdateTournamentController } from './update-tournament/update-tournament.controller';
import { UpdateTournamentService } from './update-tournament/update-tournament.service';
import { TeamEntity } from 'src/common/entities/team.entity';
import { CountryEntity } from 'src/common/entities/country.entity';
import { DeleteTournamentController } from './delete-tournament/delete-tournament.controller';
import { DeleteTournamentService } from './delete-tournament/delete-tournament.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        TypeOrmModule.forFeature([TournamentEntity, CountryEntity, TeamEntity]),
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'samuelprosi',
            signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || '1h' },
        }),
    ],
    controllers: [
        CreateTournamentController,
        UpdateTournamentController,
        DeleteTournamentController,
    ],
    providers: [
        CreateTournamentService,
        UpdateTournamentService,
        DeleteTournamentService,
    ],
})
export class TournamentModule {}
