import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonRepository } from 'src/modules/common/repositories/common.repository';
import { Repository } from 'typeorm';
import { Eth } from 'src/modules/blockchain/entities/eth.entity';

@Injectable()
export class EthRepository extends CommonRepository<Eth> {
  constructor(@InjectRepository(Eth) ethBaseRepo: Repository<Eth>) {
    super(ethBaseRepo);
  }
}
