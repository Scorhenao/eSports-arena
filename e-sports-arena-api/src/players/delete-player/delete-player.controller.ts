import { DeletePlayerService } from './delete-player.service';
import { Controller, Delete, Param } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { DeletePlayerResponseDto } from './../dto/delete-player/delete-player-response.dto';

@ApiTags('Players')
@Controller('players')
export class DeletePlayerController {
    constructor(private readonly deletePlayerService: DeletePlayerService) {}

    @Delete(':id')
    @ApiResponse({
        status: 200,
        description: 'Player deleted successfully',
        type: DeletePlayerResponseDto,
    })
    async deletePlayer(
        @Param('id') id: string,
    ): Promise<DeletePlayerResponseDto> {
        return this.deletePlayerService.deletePlayer(id);
    }
}
