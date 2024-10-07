import { ApiProperty } from '@nestjs/swagger';

export class LoginPlayerResponseDto {
    @ApiProperty({ example: 200 })
    status: number;

    @ApiProperty({
        example: { id: 'uuid-value', userName: 'playername', role: 'player' },
    })
    data: { id: string; userName: string; role: string };

    @ApiProperty({ example: 'Login successful.' })
    message: string;

    @ApiProperty({ example: 'your-jwt-token' })
    token: string; // JWT token
}
