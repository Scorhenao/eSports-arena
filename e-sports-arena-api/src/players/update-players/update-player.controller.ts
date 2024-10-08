import { UpdatePlayerService } from './update-player.service';
import { Controller, Put, Body, Param, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdatePlayerDto } from './../dto/update-player/update-player.dto';
import { UpdatePlayerResponseDto } from './../dto/update-player/update-player-response.dto';
import { ApiKeyGuard } from 'src/common/auth/guards/api-key.guard';

@ApiTags('Players')
@Controller('players')
export class UpdatePlayerController {
    constructor(private readonly updatePlayerService: UpdatePlayerService) {}

    @UseGuards(ApiKeyGuard)
    @ApiHeader({
        name: 'x-api-key',
        description: 'API Key',
        required: true,
    })
    @Put(':id')
    @ApiResponse({
        status: 200,
        description: 'Player updated successfully',
        type: UpdatePlayerResponseDto,
    })
    async updatePlayer(
        @Param('id') id: string,
        @Body() updatePlayerDto: UpdatePlayerDto,
    ): Promise<UpdatePlayerResponseDto> {
        return this.updatePlayerService.updatePlayer(id, updatePlayerDto);
    }
}
