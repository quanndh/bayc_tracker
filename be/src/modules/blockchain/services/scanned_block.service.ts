import { Injectable } from '@nestjs/common';
import { ScannedBlock } from 'src/modules/blockchain/entities/scanned_block.entity';
import { ScannedBlockRepository } from 'src/modules/blockchain/repositories/scanned_block.repository';
import { CommonService } from 'src/modules/common/services/common.service';

@Injectable()
export class ScannedBlockService extends CommonService<ScannedBlock> {
  constructor(private readonly scannedBlockRepo: ScannedBlockRepository) {
    super(scannedBlockRepo);
  }
}
