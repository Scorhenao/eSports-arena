import { ApiProperty } from '@nestjs/swagger';

export class RegisterAdminResponseDto {
    @ApiProperty({ example: 201 })
    status: number;

    @ApiProperty({ example: { id: 'uuid-value', name: 'adminuser' } })
    data: { id: string; name: string; email: string };

    @ApiProperty({ example: 'Admin registered successfully.' })
    message: string;
}
