import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Eth } from 'src/modules/blockchain/entities/eth.entity';
import { Nft } from 'src/modules/blockchain/entities/nft.entity';
import { ScannedBlock } from 'src/modules/blockchain/entities/scanned_block.entity';
import { EthRepository } from 'src/modules/blockchain/repositories/eth.repository';
import { NftRepository } from 'src/modules/blockchain/repositories/nft.repository';
import { ScannedBlockRepository } from 'src/modules/blockchain/repositories/scanned_block.repository';
import { BlockService } from 'src/modules/blockchain/services/block.service';
import { EthService } from 'src/modules/blockchain/services/eth.service';
import { NftService } from 'src/modules/blockchain/services/nft.service';
import { ScannedBlockService } from 'src/modules/blockchain/services/scanned_block.service';

@Module({
  imports: [TypeOrmModule.forFeature([Nft, ScannedBlock, Eth])],
  providers: [
    NftRepository,
    NftService,
    ScannedBlockRepository,
    ScannedBlockService,
    EthRepository,
    EthService,
    BlockService,
  ],
  exports: [NftService, ScannedBlockService, EthService],
})
export class BlockchainModule {}
