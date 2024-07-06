import { TrxPurchase } from 'src/app/trx-purchase/model/trx-purchase.entity';
import { ERole } from 'src/types/enum/ERole.enum';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'mst_user',
  orderBy: { createdAt: 'ASC' },
})
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
    nullable: true,
  })
  avatar: string;

  @Column({
    type: 'enum',
    default: ERole.USER,
    enum: ERole,
  })
  role: ERole;

  @Column({ nullable: true })
  password: string;

  @Column({
    name: 'is_active',
    default: true,
  })
  isActive: boolean;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: new Date(),
  })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    type: 'timestamp',
    default: new Date(),
  })
  updatedAt: Date;

  @OneToMany(() => TrxPurchase, (trxPurchase) => trxPurchase.user)
  transactions: TrxPurchase[];
}
