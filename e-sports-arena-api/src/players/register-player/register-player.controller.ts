import { RegisterPlayerDto } from './../dto/register-player/register-player.dto';
import { RegisterPlayerResponseDto } from './../dto/register-player/register-player-response.dto';
import { Body, Controller, Post, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Players')
@Controller('players')
export class RegisterPlayerController {
    @Post('register')
    @ApiResponse({
        status: 201,
        description: 'Player registered successfully',
        type: RegisterPlayerResponseDto,
    })
    async registerPlayer(
        @Body() registerPlayerDto: RegisterPlayerDto,
    ): Promise<RegisterPlayerResponseDto> {
        // Here you would normally handle the registration logic (service call, saving to the DB, etc.)

        return {
            status: HttpStatus.CREATED,
            message: 'Player registered successfully',
            data: registerPlayerDto, // In a real scenario, you would return the saved player data
        };
    }
}
