import { Injectable, ConflictException } from '@nestjs/common';
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
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new Admin entity
        const newAdmin = this.adminRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        try {
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
        } catch (error) {
            if (error.code === '23505') {
                // Duplicate key error
                throw new ConflictException(
                    'Admin with this name or email already exists.',
                );
            }
            // Throw the original error if it's not a duplicate key error
            throw error;
        }
    }
}
