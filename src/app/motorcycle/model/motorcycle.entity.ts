import { TrxDetailPurchase } from 'src/app/trx-detail-purchase/model/trx-detail-purchase.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'mst_motorcycle',
  orderBy: { createdAt: 'DESC' },
})
export class Motorcycle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 100,
    type: 'varchar',
  })
  name: string;

  @Column({
    type: 'numeric',
  })
  price: number;

  @Column({
    type: 'int',
  })
  stock: number;

  @Column({
    type: 'int',
  })
  year: number;

  @Column({
    name: 'is_deleted',
    type: 'boolean',
    default: false,
  })
  isDeleted: boolean;

  @Column({
    type: 'timestamp',
    name: 'created_at',
    default: new Date(),
  })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    name: 'updated_at',
    default: new Date(),
  })
  updatedAt: Date;

  @OneToMany(
    () => TrxDetailPurchase,
    (trxDetailPurchase) => trxDetailPurchase.motorcycle,
  )
  transactionDetails: TrxDetailPurchase[];
}
