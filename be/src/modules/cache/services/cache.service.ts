import { Injectable } from '@nestjs/common';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';

@Injectable()
export class CacheService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async get<T>(key: string): Promise<T | null> {
    try {
      const data = await this.redis.get(key);
      if (!data) return null;
      return JSON.parse(data);
    } catch (error) {
      throw error;
    }
  }

  async incr(key: string) {
    try {
      const data = await this.redis.incr(key);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async set<T>(key: string, payload: T) {
    try {
      await this.redis.set(key, JSON.stringify(payload));
    } catch (error) {
      throw error;
    }
  }

  async del(key: any) {
    try {
      await this.redis.del(key);
    } catch (error) {
      throw error;
    }
  }
}
