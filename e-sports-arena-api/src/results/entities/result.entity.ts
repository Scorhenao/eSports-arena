import { CompetitionEntity } from 'src/competitions/entities/competition.entity';
import { PlayerEntity } from 'src/players/entities/player.entity';
import { TournamentEntity } from 'src/tournament/entities/tournament.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TeamEntity } from 'src/common/entities/team.entity';
import { Iresult } from 'src/common/interfaces/result.interface';
@Entity('Results')
export class ResultEntity implements Partial<Iresult> {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        unique: true,
        nullable: false,
    })
    name: string;

    @Column({
        type: 'int',
        nullable: false,
    })
    points: number;

    @ManyToOne(() => TournamentEntity, (tournament) => tournament.results)
    tournament: TournamentEntity;

    @ManyToOne(() => PlayerEntity, (player) => player.results)
    player: PlayerEntity;

    @ManyToOne(() => CompetitionEntity, (competition) => competition.results)
    competition: CompetitionEntity;

    // Añade esta relación
    @ManyToOne(() => TeamEntity, (team) => team.results)
    team: TeamEntity;
}
