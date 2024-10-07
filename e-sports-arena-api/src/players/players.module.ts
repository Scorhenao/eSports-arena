import { Module } from '@nestjs/common';
import { RegisterPlayerController } from './register-player/register-player.controller';
import { RegisterPlayerService } from './register-player/register-player.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerEntity } from './entities/player.entity';
import { LoginPlayerController } from './login-player/login-player.controller';
import { LoginPlayerService } from './login-player/login-player.service';
import { JwtModule } from '@nestjs/jwt';
import { TeamEntity } from 'src/common/entities/team.entity';
import { CountryEntity } from 'src/common/entities/country.entity';
import { UpdatePlayerService } from './update-players/update-player.service';
import { UpdatePlayerController } from './update-players/update-player.controller';
import { DeletePlayerService } from './delete-player/delete-player.service';
import { DeletePlayerController } from './delete-player/delete-player.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([PlayerEntity, CountryEntity, TeamEntity]),
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
        }),
    ],
    controllers: [
        RegisterPlayerController,
        LoginPlayerController,
        UpdatePlayerController,
        DeletePlayerController,
    ],
    providers: [
        RegisterPlayerService,
        LoginPlayerService,
        UpdatePlayerService,
        DeletePlayerService,
    ],
})
export class PlayersModule {}
