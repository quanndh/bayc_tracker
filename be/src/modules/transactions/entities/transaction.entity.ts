import { UUIDEntity } from 'src/modules/common/entities/base-entity';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'transactions',
})
export class Transaction extends UUIDEntity {
  @Column()
  tokenId: string;

  @Column()
  quantity: number;

  @Column()
  buyer: string;

  @Column()
  seller: string;

  @Column('decimal')
  priceInEth: number;

  @Column('decimal')
  price: number;

  @Column({ unique: true })
  txHash: string;
}
