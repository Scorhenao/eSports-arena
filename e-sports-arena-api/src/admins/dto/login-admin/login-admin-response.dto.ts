import { ApiProperty } from '@nestjs/swagger';

export class LoginAdminResponseDto {
    @ApiProperty({ example: 200 })
    status: number;

    @ApiProperty()
    data: {
        accessToken: string; // JWT token for the admin
    };

    @ApiProperty({ example: 'Login successful.' })
    message: string;
}
