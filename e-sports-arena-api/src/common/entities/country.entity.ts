import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Icountry } from '../interfaces/country.interface';
import { TeamEntity } from './team.entity';
import { PlayerEntity } from 'src/players/entities/player.entity';
import { TournamentEntity } from 'src/tournament/entities/tournament.entity';

@Entity('Countries')
export class CountryEntity implements Partial<Icountry> {
    @PrimaryColumn()
    id: number;

    @Column({
        type: 'varchar',
        unique: true,
        nullable: false,
    })
    name: string;

    // Explanation: A country can have many teams. This is a One-to-Many relationship.
    @OneToMany(() => TeamEntity, (team) => team.country)
    teams: TeamEntity[];

    // Explanation: A country can host multiple tournaments. This is a One-to-Many relationship.
    @OneToMany(() => TournamentEntity, (tournament) => tournament.country)
    tournaments: TournamentEntity[]; // Add the tournaments relationship

    @OneToMany(() => PlayerEntity, (player) => player.country)
    players: PlayerEntity[];
}
