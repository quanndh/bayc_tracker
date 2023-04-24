import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ScannedBlock } from 'src/modules/blockchain/entities/scanned_block.entity';
import { CommonRepository } from 'src/modules/common/repositories/common.repository';
import { Repository } from 'typeorm';

@Injectable()
export class ScannedBlockRepository extends CommonRepository<ScannedBlock> {
  constructor(
    @InjectRepository(ScannedBlock)
    scannedBlockBaseRepo: Repository<ScannedBlock>,
  ) {
    super(scannedBlockBaseRepo);
  }
}
