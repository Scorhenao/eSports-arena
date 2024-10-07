import { ApiProperty } from '@nestjs/swagger';

export class RegisterPlayerResponseDto {
    @ApiProperty({ description: 'HTTP status code', example: 201 })
    status: number;

    @ApiProperty({
        description: 'Response message',
        example: 'Player registered successfully',
    })
    message: string;

    @ApiProperty({ description: 'Player data' })
    data: any;
}
