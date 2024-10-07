import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDatabaseConfig } from './config/database.config';
import { PlayersModule } from './players/players.module';
import { TournamentModule } from './tournament/tournament.module';
import { ResultsModule } from './results/results.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: getDatabaseConfig,
        }),
        PlayersModule,
        TournamentModule,
        ResultsModule,
    ],
})
export class AppModule {}
