import { ServiceBroker, Transporters } from 'moleculer';

const NatsTransporter = Transporters.NATS;

export const BrokerProviders = [
  {
    provide: 'Broker',
    useFactory: async () => {
      const broker = new ServiceBroker({
        namespace: 'kioson',
        nodeID: process.argv[2] || `ap-server-${process.pid}`,
        transporter: new NatsTransporter(),
        logger: console,
        serializer: 'Avro',
      });
      return await broker;
    },
  },
];