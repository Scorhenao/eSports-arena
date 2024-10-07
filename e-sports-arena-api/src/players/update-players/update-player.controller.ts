import { UpdatePlayerService } from './update-player.service';
import { Controller, Put, Body, Param } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdatePlayerDto } from './../dto/update-player/update-player.dto';
import { UpdatePlayerResponseDto } from './../dto/update-player/update-player-response.dto';

@ApiTags('Players')
@Controller('players')
export class UpdatePlayerController {
    constructor(private readonly updatePlayerService: UpdatePlayerService) {}

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
