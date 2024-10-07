import { LoginAdminService } from './login-admin.service';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginAdminDto } from './../dto/login-admin/login-admin.dto';
import { LoginAdminResponseDto } from './../dto/login-admin/login-admin-response.dto';

@ApiTags('admins')
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
