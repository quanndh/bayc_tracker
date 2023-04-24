import { UUIDEntity } from 'src/modules/common/entities/base-entity';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'eth',
})
export class Eth extends UUIDEntity {
  @Column('decimal')
  lastPrice: number;
}
