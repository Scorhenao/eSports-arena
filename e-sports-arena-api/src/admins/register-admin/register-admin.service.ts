import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterAdminDto } from './../dto/register-admin/register-admin.dto';
import { RegisterAdminResponseDto } from './../dto/register-admin/register-admin-response.dto';
import { AdminEntity } from '../entities/admin.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RegisterAdminService {
    constructor(
        @InjectRepository(AdminEntity)
        private readonly adminRepository: Repository<AdminEntity>,
    ) {}

    async registerAdmin(
        registerAdminDto: RegisterAdminDto,
    ): Promise<RegisterAdminResponseDto> {
        const { name, email, password } = registerAdminDto;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

        // Create a new Admin entity
        const newAdmin = this.adminRepository.create({
            name,
            email,
            password: hashedPassword, // Store the hashed password
        });

        // Save the admin to the database
        await this.adminRepository.save(newAdmin);

        // Prepare the response DTO
        return {
            status: 201,
            data: {
                id: newAdmin.id,
                name: newAdmin.name,
                email: newAdmin.email,
            },
            message: 'Admin registered successfully.',
        };
    }
}
