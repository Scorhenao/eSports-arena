import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { TeamEntity } from 'src/common/entities/team.entity';
import { CompetitionEntity } from 'src/competitions/entities/competition.entity';

@Entity()
export class CompetitionResultEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => CompetitionEntity, (competition) => competition.results)
    competition: CompetitionEntity;

    @ManyToOne(() => TeamEntity)
    winner: TeamEntity;

    @ManyToOne(() => TeamEntity)
    loser: TeamEntity;
}
