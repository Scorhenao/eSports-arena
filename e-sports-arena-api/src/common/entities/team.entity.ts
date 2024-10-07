import { PlayerEntity } from 'src/players/entities/player.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { Iteam } from '../interfaces/team.interface';
import { CountryEntity } from './country.entity';

@Entity('Teams')
export class TeamEntity implements Partial<Iteam> {
    @PrimaryColumn()
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
}
