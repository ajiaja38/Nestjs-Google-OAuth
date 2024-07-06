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
    default: new Date(),
  })
  createdAt: Date;

  @Column({
    default: new Date(),
  })
  updatedAt: Date;
}
