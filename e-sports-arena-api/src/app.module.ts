import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDatabaseConfig } from './config/database.config';
import { PlayersModule } from './players/players.module';
import { TournamentModule } from './tournament/tournament.module';
import { ResultsModule } from './results/results.module';
import { AdminsModule } from './admins/admins.module';
import { SeederModule } from './common/seed/seeder.module';
import { CompetitionsModule } from './competitions/competitions.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: getDatabaseConfig,
        }),
        PlayersModule,
        TournamentModule,
        ResultsModule,
        AdminsModule,
        SeederModule,
        CompetitionsModule,
    ],
})
export class AppModule {}
