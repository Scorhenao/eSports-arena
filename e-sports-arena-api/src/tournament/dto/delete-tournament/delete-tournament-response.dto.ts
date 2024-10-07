import { ApiProperty } from '@nestjs/swagger';

export class DeleteTournamentResponseDto {
    @ApiProperty({ description: 'HTTP status code', example: 200 })
    status: number;

    @ApiProperty({
        description: 'Response message',
        example: 'Tournament deleted successfully.',
    })
    message: string;

    @ApiProperty({ description: 'Deleted tournament ID', nullable: true })
    data: number | null;
}
