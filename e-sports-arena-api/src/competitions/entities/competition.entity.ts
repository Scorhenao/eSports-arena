import { TournamentEntity } from 'src/tournament/entities/tournament.entity';
import { ResultEntity } from 'src/results/entities/result.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity('Competitions')
export class CompetitionEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => TournamentEntity, (tournament) => tournament.competitions)
    tournament: TournamentEntity;

    @OneToMany(() => ResultEntity, (result) => result.competition)
    results: ResultEntity[];

    @OneToMany(
        () => CompetitionEntity,
        (competition) => competition.competition,
    )
    competition: CompetitionEntity;
}
