import { Module } from '@nestjs/common';
import { RegisterPlayerController } from './register-player/register-player.controller';
import { RegisterPlayerService } from './register-player/register-player.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerEntity } from './entities/player.entity';
import { LoginPlayerController } from './login-player/login-player.controller';
import { LoginPlayerService } from './login-player/login-player.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        TypeOrmModule.forFeature([PlayerEntity]),
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
        }),
    ],
    controllers: [RegisterPlayerController, LoginPlayerController],
    providers: [RegisterPlayerService, LoginPlayerService],
})
export class PlayersModule {}
