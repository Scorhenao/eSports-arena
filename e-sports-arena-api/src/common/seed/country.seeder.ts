import { CountryEntity } from 'src/common/entities/country.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CountrySeeder {
    constructor(
        @InjectRepository(CountryEntity)
        private readonly countryRepository: Repository<CountryEntity>,
    ) {}

    async seed() {
        const countries = [
            { id: 1, name: 'United States' },
            { id: 2, name: 'Canada' },
            { id: 3, name: 'Mexico' },
            { id: 4, name: 'Brazil' },
            { id: 5, name: 'Argentina' },
            { id: 6, name: 'Spain' },
            { id: 7, name: 'Germany' },
            { id: 8, name: 'France' },
            { id: 9, name: 'Italy' },
            { id: 10, name: 'Japan' },
        ];

        await this.countryRepository.save(countries);
        console.log('Countries seeded successfully!');
    }
}
