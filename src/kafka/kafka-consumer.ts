import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka, Consumer } from 'kafkajs';

@Injectable()
export class KafkaConsumerService implements OnModuleInit {
  private readonly kafka = new Kafka({
    clientId: 'nestjs-kafka-client',
    brokers: ['localhost:9092'], 
  });

  private readonly consumer: Consumer = this.kafka.consumer({
    groupId: 'nestjs-consumer-group',
  });

  async onModuleInit() {
    await this.consumer.connect();
    await this.consumer.subscribe({ topic: 'v1-delivery', fromBeginning: true });

    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          topic,
          partition,
          offset: message.offset,
          value: message.value.toString(),
        });
      },
    });
  }
}
