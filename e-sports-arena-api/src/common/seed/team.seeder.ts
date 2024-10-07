import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeamEntity } from '../entities/team.entity';
import { CountryEntity } from '../entities/country.entity';

@Injectable()
export class TeamSeeder {
    constructor(
        @InjectRepository(TeamEntity)
        private readonly teamRepository: Repository<TeamEntity>,

        @InjectRepository(CountryEntity)
        private readonly countryRepository: Repository<CountryEntity>,
    ) {}

    async seed() {
        const countries = await this.countryRepository.find();

        // Datos de ejemplo para los equipos
        const teams = [
            { id: 1, name: 'Team A', country: countries[0] }, // Asumiendo que hay al menos un país en la base de datos
            { id: 2, name: 'Team B', country: countries[1] },
            { id: 3, name: 'Team C', country: countries[0] },
            { id: 4, name: 'Team D', country: countries[1] },
        ];

        for (const team of teams) {
            const exists = await this.teamRepository.findOne({
                where: { name: team.name },
            });
            if (!exists) {
                await this.teamRepository.save(team);
            }
        }

        console.log('Teams seeded successfully!');
    }
}
