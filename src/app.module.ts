import { Module } from '@nestjs/common';
import { KafkaService } from './kafka/kafka-producer';
import { KafkaClientModule } from './kafka/kafka-client-module';
import { HealthController } from './health/health.controller';
import { KafkaConsumerService } from './kafka/kafka-consumer';

@Module({
  imports: [KafkaClientModule],
  controllers: [HealthController],
  providers: [KafkaService, KafkaConsumerService],
})
export class AppModule {}
