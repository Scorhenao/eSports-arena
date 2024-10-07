import { CountryEntity } from 'src/common/entities/country.entity';
import { ITournament } from 'src/common/interfaces/tournament.interface';
import { ResultEntity } from 'src/results/entities/result.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';

@Entity('Tournaments')
export class TournamentEntity implements Partial<ITournament> {
    @PrimaryColumn()
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
}
