import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application } from 'express';
import globalMiddleware from './app/middleware/globalErrorhandle';
import notFound from './app/middleware/notFound';
import router from './app/routes';
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors({ origin: ['http://localhost:5173'] }));
app.use(cookieParser());

app.use('/api', router);

app.use(globalMiddleware);
app.use(notFound); // route not found

export default app;
