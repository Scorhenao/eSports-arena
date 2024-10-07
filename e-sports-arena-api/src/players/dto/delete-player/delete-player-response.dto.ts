import { ApiProperty } from '@nestjs/swagger';

export class DeletePlayerResponseDto {
    @ApiProperty({ description: 'HTTP status code', example: 200 })
    status: number;

    @ApiProperty({
        description: 'Response message',
        example: 'Player deleted successfully',
    })
    message: string;
}
