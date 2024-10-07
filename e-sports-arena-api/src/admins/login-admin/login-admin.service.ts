import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginAdminDto } from './../dto/login-admin/login-admin.dto';
import { LoginAdminResponseDto } from './../dto/login-admin/login-admin-response.dto';
import { AdminEntity } from '../entities/admin.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginAdminService {
    constructor(
        @InjectRepository(AdminEntity)
        private readonly adminRepository: Repository<AdminEntity>,
        private readonly jwtService: JwtService,
    ) {}

    async loginAdmin(
        loginAdminDto: LoginAdminDto,
    ): Promise<LoginAdminResponseDto> {
        const { email, password } = loginAdminDto;

        const admin = await this.adminRepository.findOne({ where: { email } });

        if (!admin || !(await bcrypt.compare(password, admin.password))) {
            throw new UnauthorizedException('Invalid email or password.');
        }

        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error('JWT Secret is not defined'); // This will help identify if secret is missing
        }

        const accessToken = this.jwtService.sign({
            id: admin.id,
            role: 'admin',
        });

        return {
            status: 200,
            data: {
                accessToken,
            },
            message: 'Login successful.',
        };
    }
}
