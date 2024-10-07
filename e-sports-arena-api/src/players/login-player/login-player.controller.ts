import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginPlayerDto } from './../dto/login-player/login-player.dto';
import { LoginPlayerResponseDto } from './../dto/login-player/login-player-response.dto';
import { LoginPlayerService } from './login-player.service';

@ApiTags('Players') // Tag for grouping the controller in Swagger
@Controller('players/login')
export class LoginPlayerController {
    constructor(private readonly loginPlayerService: LoginPlayerService) {}

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
