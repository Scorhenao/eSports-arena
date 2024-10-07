import { RegisterAdminDto } from './../dto/register-admin/register-admin.dto';
import { RegisterAdminResponseDto } from './../dto/register-admin/register-admin-response.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegisterAdminService } from './register-admin.service';

@ApiTags('admins')
@Controller('admins')
export class RegisterAdminController {
    constructor(private readonly registerAdminService: RegisterAdminService) {}

    @Post('register')
    @ApiResponse({
        status: 201,
        description: 'Admin registered successfully.',
        type: RegisterAdminResponseDto,
    })
    async register(
        @Body() registerAdminDto: RegisterAdminDto,
    ): Promise<RegisterAdminResponseDto> {
        return this.registerAdminService.registerAdmin(registerAdminDto);
    }
}
