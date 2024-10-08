import { PlayerEntity } from 'src/players/entities/player.entity';
import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    ManyToMany,
} from 'typeorm';
import { Iteam } from '../interfaces/team.interface';
import { CountryEntity } from './country.entity';
import { TournamentEntity } from 'src/tournament/entities/tournament.entity'; // Import TournamentEntity
import { ResultEntity } from 'src/results/entities/result.entity';

@Entity('Teams')
export class TeamEntity implements Partial<Iteam> {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        unique: true,
        nullable: false,
    })
    name: string;

    // Explanation: A team belongs to one country. This creates the Many-to-One relationship where each team has one country, and a country can have many teams.
    @ManyToOne(() => CountryEntity, (country) => country.teams)
    country: CountryEntity;

    // Explanation: A team has many players, but each player belongs to one team.
    @OneToMany(() => PlayerEntity, (player) => player.team)
    players: PlayerEntity[];

    // Explanation: A team can participate in multiple tournaments.
    @ManyToMany(() => TournamentEntity, (tournament) => tournament.teams)
    tournaments: TournamentEntity[];

    @OneToMany(() => ResultEntity, (result) => result.team)
    results: ResultEntity[]; // Relación con los resultados
}
