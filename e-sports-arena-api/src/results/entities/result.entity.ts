import { Iresult } from 'src/common/interfaces/result.interface';
import { PlayerEntity } from 'src/players/entities/player.entity';
import { TournamentEntity } from 'src/tournament/entities/tournament.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
@Entity('Results')
export class ResultEntity implements Partial<Iresult> {
    @PrimaryColumn('uuid')
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
    teamId: number;

    @Column({
        type: 'int',
        nullable: false,
    })
    tournamentId: number;

    @Column({
        type: 'int',
        nullable: false,
    })
    countryId: number;

    @Column({
        type: 'varchar',
        nullable: false,
    })
    playerId: string;

    //Explanation: Each result belongs to a specific tournament. A tournament can have many results (one result per match).
    @ManyToOne(() => TournamentEntity, (tournament) => tournament.results)
    tournament: TournamentEntity;

    // Explanation: Each result belongs to a specific player. A player has many results, but a result belongs to only one player.
    @ManyToOne(() => PlayerEntity, (player) => player.results)
    player: PlayerEntity;
}
