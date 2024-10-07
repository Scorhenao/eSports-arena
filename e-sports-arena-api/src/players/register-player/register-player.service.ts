import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterPlayerDto } from './../dto/register-player/register-player.dto';
import { RegisterPlayerResponseDto } from './../dto/register-player/register-player-response.dto';
import { PlayerEntity } from 'src/players/entities/player.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RegisterPlayerService {
    constructor(
        @InjectRepository(PlayerEntity)
        private readonly playerRepository: Repository<PlayerEntity>,
    ) {}

    async registerPlayer(
        registerPlayerDto: RegisterPlayerDto,
    ): Promise<RegisterPlayerResponseDto> {
        const {
            userName,
            name,
            lastName,
            email,
            age,
            position,
            countryId,
            teamId,
            password, // Ensure this is included in the DTO
        } = registerPlayerDto;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

        // Create a new PlayerEntity
        const player = this.playerRepository.create({
            userName,
            name,
            lastName,
            email,
            age,
            position,
            country: { id: countryId }, // Set the country relation
            team: { id: teamId }, // Set the team relation
            password: hashedPassword, // Store the hashed password
        });

        // Save the player to the database
        await this.playerRepository.save(player);

        // Prepare the response DTO
        const response: RegisterPlayerResponseDto = {
            status: 201,
            data: player,
            message: 'Player registered successfully.',
        };

        return response;
    }
}
