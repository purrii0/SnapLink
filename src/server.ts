import fastify from './app'
import process from "node:process"
import config from './config/env';

const port = Number(config.port);

try {
  await fastify.listen({ port })
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
