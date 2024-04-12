import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { routes } from './routes';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger';

const app = express();
app.use(
  cors({
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Origin',
      'x-access-token',
    ],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
  })
);
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

routes(app);

app.get('/', (_, res) => {
  res.json({ message: 'This is Chat Cuy API' });
});

export default app;
