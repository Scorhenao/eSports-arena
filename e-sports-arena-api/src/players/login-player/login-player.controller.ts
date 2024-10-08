import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginPlayerDto } from './../dto/login-player/login-player.dto';
import { LoginPlayerResponseDto } from './../dto/login-player/login-player-response.dto';
import { LoginPlayerService } from './login-player.service';
import { ApiKeyGuard } from 'src/common/auth/guards/api-key.guard';

@ApiTags('Players') // Tag for grouping the controller in Swagger
@Controller('players/login')
export class LoginPlayerController {
    constructor(private readonly loginPlayerService: LoginPlayerService) {}

    @UseGuards(ApiKeyGuard)
    @ApiHeader({
        name: 'x-api-key',
        description: 'API Key',
        required: true,
    })
    @Post()
    @ApiOperation({ summary: 'Login a player' }) // Summary of the operation
    @ApiResponse({
        status: 200,
        description: 'Login successful',
        type: LoginPlayerResponseDto, // The type of the response
    })
    @ApiResponse({
        status: 401,
        description: 'Invalid credentials', // Description for unauthorized error
    })
    async login(
        @Body() loginPlayerDto: LoginPlayerDto,
    ): Promise<LoginPlayerResponseDto> {
        return this.loginPlayerService.loginPlayer(loginPlayerDto);
    }
}
