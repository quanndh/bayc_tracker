import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonRepository } from 'src/modules/common/repositories/common.repository';
import { Nft } from 'src/modules/blockchain/entities/nft.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NftRepository extends CommonRepository<Nft> {
  constructor(@InjectRepository(Nft) nftBaseRepo: Repository<Nft>) {
    super(nftBaseRepo);
  }
}
