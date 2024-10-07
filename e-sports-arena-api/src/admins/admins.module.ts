import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt'; // Import JwtModule
import { AdminEntity } from './entities/admin.entity';
import { RegisterAdminController } from './register-admin/register-admin.controller';
import { RegisterAdminService } from './register-admin/register-admin.service';
import { LoginAdminController } from './login-admin/login-admin.controller';
import { LoginAdminService } from './login-admin/login-admin.service';
import { JwtAuthGuard } from 'src/common/auth/guards/jwt-auth.guard';

@Module({
    imports: [
        TypeOrmModule.forFeature([AdminEntity]),
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'samuelprosi',
            signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || '1h' },
        }),
    ],
    controllers: [RegisterAdminController, LoginAdminController],
    providers: [RegisterAdminService, LoginAdminService, JwtAuthGuard],
})
export class AdminsModule {}
