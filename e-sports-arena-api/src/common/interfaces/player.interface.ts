import { ResultEntity } from 'src/results/entities/result.entity';
import { CountryEntity } from '../entities/country.entity';
import { TeamEntity } from '../entities/team.entity';

export interface IPlayer {
    id: string;
    userName: string;
    name: string;
    lastName: string;
    email: string;
    password: string;
    age: number;
    position: string;
    country: CountryEntity;
    team: TeamEntity;
    results: ResultEntity[];
}
