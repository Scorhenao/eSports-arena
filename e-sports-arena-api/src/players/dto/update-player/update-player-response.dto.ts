import { ApiProperty } from '@nestjs/swagger';

export class UpdatePlayerResponseDto {
    @ApiProperty({ description: 'HTTP status code', example: 200 })
    status: number;

    @ApiProperty({
        description: 'Response message',
        example: 'Player updated successfully',
    })
    message: string;

    @ApiProperty({ description: 'Updated player data' })
    data: any; // Puedes definir un tipo más específico si es necesario
}
