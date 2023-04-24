import { Network } from 'alchemy-sdk';
import { Eth } from 'src/modules/blockchain/entities/eth.entity';
import { Nft } from 'src/modules/blockchain/entities/nft.entity';
import { ScannedBlock } from 'src/modules/blockchain/entities/scanned_block.entity';
import { Transaction } from 'src/modules/transactions/entities/transaction.entity';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export default () => {
  return {
    port: Number(process.env.PORT) || 3000,
    database: {
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      synchronize: process.env.DATABASE_SYNC === 'true',
      connectTimeoutMS: 10000,
      maxQueryExecutionTime: 5000,
      logging: process.env.DATABASE_LOGGING === 'true',
      type: 'postgres',
      entities: [Transaction, Nft, ScannedBlock, Eth],
      logNotifications: true,
      namingStrategy: new SnakeNamingStrategy(),
    },
    redis: {
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT),
      ttl: 86400,
      password: process.env.REDIS_PASSWORD,
    },
    rpc: process.env.RPC,
    blockConfirm: Number(process.env.BLOCK_CONFIRM),
    alchemy: {
      apiKey: process.env.ALCHEMY_KEY,
      network: Network.ETH_MAINNET,
    },
    cmcKey: process.env.CMC_KEY,
  };
};
