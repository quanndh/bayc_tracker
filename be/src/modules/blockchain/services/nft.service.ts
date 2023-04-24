import { Injectable } from '@nestjs/common';
import { CommonService } from 'src/modules/common/services/common.service';
import { Nft } from 'src/modules/blockchain/entities/nft.entity';
import { NftRepository } from 'src/modules/blockchain/repositories/nft.repository';

@Injectable()
export class NftService extends CommonService<Nft> {
  constructor(private readonly nftRepo: NftRepository) {
    super(nftRepo);
  }
}
