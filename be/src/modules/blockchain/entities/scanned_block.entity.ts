import { UUIDEntity } from 'src/modules/common/entities/base-entity';
import { Column, Entity, Index } from 'typeorm';

@Entity({
  name: 'scanned_block',
})
export class ScannedBlock extends UUIDEntity {
  @Index()
  @Column()
  lastScannedBlock: number;

  //chainId: support multi chain
}
