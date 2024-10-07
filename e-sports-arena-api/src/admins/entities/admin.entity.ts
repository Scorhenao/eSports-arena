import { IAdmin } from 'src/common/interfaces/admin.interface';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Admins')
export class AdminEntity implements Partial<IAdmin> {
    @PrimaryGeneratedColumn('uuid') // Change this line
    id: string;

    @Column({ unique: true })
    name: string;

    @Column({ unique: true, nullable: false })
    email: string;

    @Column({
        unique: true,
        nullable: false,
    })
    password: string;
}
