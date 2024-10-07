import { CountryEntity } from 'src/common/entities/country.entity';
import { TeamEntity } from 'src/common/entities/team.entity';
import { IPlayer } from 'src/common/interfaces/player.interface';
import { ResultEntity } from 'src/results/entities/result.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';

@Entity('Players')
export class PlayerEntity implements Partial<IPlayer> {
    @PrimaryColumn('uuid')
    id: string;

    @Column({
        unique: true,
        nullable: false,
    })
    userName: string;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
    })
    name: string;

    @Column({
        type: 'varchar',
        length: 150,
        nullable: false,
    })
    lastName: string;

    @Column({
        type: 'varchar',
        length: 250,
        unique: true,
    })
    email: string;

    @Column({
        type: 'varchar',
        length: 150,
        nullable: false,
    })
    password: string;

    @Column({
        type: 'int',
        nullable: false,
    })
    age: number;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
    })
    position: string;

    // Explanation: A player belongs to one country. This is a Many-to-One relationship because multiple players can belong to a single country.
    @ManyToOne(() => CountryEntity, (country) => country.players)
    country: CountryEntity;

    //Explanation: A player belongs to one team. This is a Many-to-One relationship where a player is part of a team, and each team can have multiple players.
    @ManyToOne(() => TeamEntity, (team) => team.players)
    team: TeamEntity;

    // Explanation: A player has many results, but each result belongs to only one player. This defines the One-to-Many relationship with results.
    @OneToMany(() => ResultEntity, (result) => result.player)
    results: ResultEntity[];
}
