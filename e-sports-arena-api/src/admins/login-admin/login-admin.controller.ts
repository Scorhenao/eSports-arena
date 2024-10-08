import { LoginAdminService } from './login-admin.service';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { LoginAdminDto } from './../dto/login-admin/login-admin.dto';
import { LoginAdminResponseDto } from './../dto/login-admin/login-admin-response.dto';
import { ApiKeyGuard } from 'src/common/auth/guards/api-key.guard';

@ApiTags('admins')
@UseGuards(ApiKeyGuard)
@ApiHeader({
    name: 'x-api-key',
    description: 'API Key',
    required: true,
})
@Controller('admin')
export class LoginAdminController {
    constructor(private readonly adminService: LoginAdminService) {}

    @Post('login')
    async login(
        @Body() loginAdminDto: LoginAdminDto,
    ): Promise<LoginAdminResponseDto> {
        return this.adminService.loginAdmin(loginAdminDto);
    }
}
