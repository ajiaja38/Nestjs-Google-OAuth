import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'store',
  orderBy: {
    createdAt: 'ASC',
  },
})
export class Store {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

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
}
