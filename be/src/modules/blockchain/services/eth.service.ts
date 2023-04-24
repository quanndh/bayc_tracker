import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CommonService } from 'src/modules/common/services/common.service';
import { EthRepository } from 'src/modules/blockchain/repositories/eth.repository';
import { Eth } from 'src/modules/blockchain/entities/eth.entity';
import { CacheService } from 'src/modules/cache/services/cache.service';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { CacheKey } from 'src/modules/cache/utils/cache_key';

@Injectable()
export class EthService extends CommonService<Eth> implements OnModuleInit {
  private readonly logger = new Logger(EthService.name);
  constructor(
    private readonly ethRepo: EthRepository,
    private readonly cacheService: CacheService,
    private readonly configService: ConfigService,
  ) {
    super(ethRepo);
  }

  async onModuleInit() {
    await this.setPrice();
  }

  setPrice = async () => {
    try {
      const res = await axios(
        `https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=ETH&CMC_PRO_API_KEY=${this.configService.get(
          'cmcKey',
        )}`,
      );
      const currentPrice = res.data.data.ETH[0].quote.USD.price;

      const eth = await this.findOne({ where: {} });

      if (!eth) {
        await this.create({ lastPrice: currentPrice });
      } else {
        await this.update(eth.id, { lastPrice: currentPrice });
      }

      await this.cacheService.set(CacheKey.ethPrice, currentPrice);
    } catch (error) {
      this.logger.error(error);
    }
  };
}
