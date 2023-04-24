import { UUIDEntity } from 'src/modules/common/entities/base-entity';
import { Column, Entity, Index } from 'typeorm';

@Entity({
  name: 'nfts',
})
export class Nft extends UUIDEntity {
  @Index()
  @Column({ unique: true })
  tokenId: string;

  @Column()
  image: string;

  @Column('decimal', { nullable: true })
  lastPrice?: number;
}
