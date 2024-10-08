import { DeletePlayerService } from './delete-player.service';
import { Controller, Delete, Param, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DeletePlayerResponseDto } from './../dto/delete-player/delete-player-response.dto';
import { ApiKeyGuard } from 'src/common/auth/guards/api-key.guard';

@ApiTags('Players')
@Controller('players')
export class DeletePlayerController {
    constructor(private readonly deletePlayerService: DeletePlayerService) {}

    @UseGuards(ApiKeyGuard)
    @ApiHeader({
        name: 'x-api-key',
        description: 'API Key',
        required: true,
    })
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
