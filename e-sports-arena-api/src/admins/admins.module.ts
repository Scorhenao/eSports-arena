import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminEntity } from './entities/admin.entity';
import { RegisterAdminController } from './register-admin/register-admin.controller';
import { RegisterAdminService } from './register-admin/register-admin.service';

@Module({
    imports: [TypeOrmModule.forFeature([AdminEntity])],
    controllers: [RegisterAdminController],
    providers: [RegisterAdminService],
})
export class AdminsModule {}
