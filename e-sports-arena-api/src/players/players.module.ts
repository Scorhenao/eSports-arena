import { Module } from '@nestjs/common';
import { RegisterPlayerController } from './register-player/register-player.controller';
import { RegisterPlayerService } from './register-player/register-player.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerEntity } from './entities/player.entity';

@Module({
    imports: [TypeOrmModule.forFeature([PlayerEntity])],
    controllers: [RegisterPlayerController],
    providers: [RegisterPlayerService],
})
export class PlayersModule {}
