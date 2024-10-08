import { TeamEntity } from 'src/common/entities/team.entity';
import { CountryEntity } from 'src/common/entities/country.entity';
import { ITournament } from 'src/common/interfaces/tournament.interface';
import { ResultEntity } from 'src/results/entities/result.entity';
import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    ManyToMany,
    JoinTable,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { CompetitionEntity } from 'src/competitions/entities/competition.entity';

@Entity('Tournaments')
export class TournamentEntity implements Partial<ITournament> {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        unique: true,
        nullable: false,
    })
    name: string;

    // Explanation: A tournament has multiple results, but each result belongs to one tournament. This defines the One-to-Many relationship with results.
    @OneToMany(() => ResultEntity, (result) => result.tournament)
    results: ResultEntity[];

    // Explanation: A tournament takes place in one country. This is a Many-to-One relationship where multiple tournaments can happen in the same country.
    @ManyToOne(() => CountryEntity, (country) => country.tournaments)
    country: CountryEntity;

    // Explanation: A tournament can have multiple teams, and each team can participate in multiple tournaments.
    @ManyToMany(() => TeamEntity, (team) => team.tournaments)
    @JoinTable({
        name: 'tournament_teams', // Name of the join table
        joinColumn: {
            name: 'tournamentId',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'teamId',
            referencedColumnName: 'id',
        },
    })
    teams: TeamEntity[];

    @OneToMany(() => CompetitionEntity, (competition) => competition.tournament)
    competitions: CompetitionEntity[];
}
