import { RegisterPlayerDto } from './../dto/register-player/register-player.dto';
import { RegisterPlayerResponseDto } from './../dto/register-player/register-player-response.dto';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegisterPlayerService } from './register-player.service';
import { ApiKeyGuard } from 'src/common/auth/guards/api-key.guard';

@ApiTags('Players')
@Controller('players')
export class RegisterPlayerController {
    constructor(
        private readonly registerPlayerService: RegisterPlayerService,
    ) {} // Inject the service

    @UseGuards(ApiKeyGuard)
    @ApiHeader({
        name: 'x-api-key',
        description: 'API Key',
        required: true,
    })
    @Post('register')
    @ApiResponse({
        status: 201,
        description: 'Player registered successfully',
        type: RegisterPlayerResponseDto,
    })
    async registerPlayer(
        @Body() registerPlayerDto: RegisterPlayerDto,
    ): Promise<RegisterPlayerResponseDto> {
        // Call the service to handle the registration logic
        return this.registerPlayerService.registerPlayer(registerPlayerDto);
    }
}
