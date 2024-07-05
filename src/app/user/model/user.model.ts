import { ERole } from 'src/types/enum/ERole.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'mst_user' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    type: 'enum',
    default: ERole.USER,
    enum: ERole,
  })
  role: ERole;

  @Column({ nullable: true })
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
