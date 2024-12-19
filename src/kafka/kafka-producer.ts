import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";

@Injectable()
export class KafkaService implements OnModuleInit {
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    // Conectar ao Kafka ao iniciar o módulo
    await this.kafkaClient.connect();

    // Publica mensagem automaticamente ao iniciar
    await this.createDelivery();
  }

  async createDelivery() {
    const event = {
      event: 'delivery.status',
    };

    // Publica mensagem no tópico
    this.kafkaClient.emit('v1-delivery', event);
    console.log('Evento publicado no Kafka:', event);

    return { message: 'Status para entrega!' };
  }
}