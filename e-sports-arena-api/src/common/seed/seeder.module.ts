import { CountryEntity } from 'src/common/entities/country.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountrySeeder } from './country.seeder';
import { TeamSeeder } from './team.seeder';
import { TeamEntity } from '../entities/team.entity';

@Module({
    imports: [TypeOrmModule.forFeature([CountryEntity, TeamEntity])],
    providers: [CountrySeeder, TeamSeeder],
    exports: [CountrySeeder, TeamSeeder],
})
export class SeederModule {}
