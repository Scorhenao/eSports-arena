import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginPlayerDto } from './../dto/login-player/login-player.dto';
import { LoginPlayerResponseDto } from './../dto/login-player/login-player-response.dto';
import { PlayerEntity } from '../entities/player.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginPlayerService {
    constructor(
        @InjectRepository(PlayerEntity)
        private readonly playerRepository: Repository<PlayerEntity>,
        private readonly jwtService: JwtService,
    ) {}

    async loginPlayer(
        loginPlayerDto: LoginPlayerDto,
    ): Promise<LoginPlayerResponseDto> {
        const { email, password } = loginPlayerDto;

        // Find the player by email
        const player = await this.playerRepository.findOne({
            where: { email },
        });

        if (!player) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // Compare the password with the stored hash
        const isPasswordValid = await bcrypt.compare(password, player.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // Generate a JWT token
        const token = this.jwtService.sign({ id: player.id, role: 'player' });

        return {
            status: 200,
            data: {
                id: player.id,
                userName: player.userName,
                role: 'player',
            },
            message: 'Login successful.',
            token, // Include the token in the response
        };
    }
}
