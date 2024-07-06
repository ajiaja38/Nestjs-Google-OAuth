import { TrxDetailPurchase } from 'src/app/trx-detail-purchase/model/trx-detail-purchase.entity';
import { User } from 'src/app/user/model/user.model';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'trx_purchase',
  orderBy: {
    createdAt: 'ASC',
  },
})
export class TrxPurchase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: new Date(),
  })
  createdAt: Date;

  @Column({
    name: 'total_price',
    type: 'numeric',
  })
  totalTransactionPrice: number;

  @ManyToOne(() => User, (user) => user.transactions)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @OneToMany(
    () => TrxDetailPurchase,
    (trxDetailPurchase) => trxDetailPurchase.trxPurchase,
  )
  transactionDetails: TrxDetailPurchase[];
}
