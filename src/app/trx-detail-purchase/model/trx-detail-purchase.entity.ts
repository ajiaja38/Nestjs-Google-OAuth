import { Motorcycle } from 'src/app/motorcycle/model/motorcycle.entity';
import { TrxPurchase } from 'src/app/trx-purchase/model/trx-purchase.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'trx_detail_purchase',
})
export class TrxDetailPurchase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'total_price',
    type: 'int',
  })
  totalPrice: number;

  @Column({
    name: 'quantity',
    type: 'int',
  })
  quantity: number;

  @ManyToOne(() => TrxPurchase, (trxPurchase) => trxPurchase.transactionDetails)
  @JoinColumn({ name: 'trx_purchase_id', referencedColumnName: 'id' })
  trxPurchase: TrxPurchase;

  @ManyToOne(() => Motorcycle, (motorcycle) => motorcycle.transactionDetails)
  @JoinColumn({ name: 'motorcycle_id', referencedColumnName: 'id' })
  motorcycle: Motorcycle;
}
