/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
import Stripe from 'stripe';
import { createServer } from 'http';
// import { Server } from 'socket.io';
import helmet from 'helmet';
import config from './app/config';
import globalErrorHandler from './app/middlewares/globalErrorhandler';


const stripe = new Stripe(config.stripe_secret_key as string);
const app: Application = express();
const httpServer = createServer(app);
// const io = new Server(httpServer, {
//   pingTimeout: 60000,
//   cors: {
//     origin: [ 'http://192.168.12.63:5173', 'https://app.performroom.com', 'http://192.168.12.63:3001', 'http://34.233.41.57:3000', 'http://34.233.41.57:3001', 'https://app.performroom.com', 'https://dashboard.performroom.com', 'https://performroom.com'], // Allowed origins
//     credentials: true,
//     methods: ['GET', 'POST', 'PUT', 'patch', 'DELETE'],
//   },
// });


// Middleware
app.use(helmet()); // Security headers
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(
  cors({
    // origin: ['http://192.168.12.63:5173', 'https://app.performroom.com', 'http://192.168.12.63:3001', 'http://34.233.41.57:3000', 'http://34.233.41.57:3001', 'https://app.performroom.com', 'https://dashboard.performroom.com', 'https://performroom.com'],
    // credentials: true,
  })
);


// app.use(express.json({
//   limit: '50mb',
//   verify: (req: any, res, buf) => {
//     if (req.originalUrl === '/api/v1/payment/webhook') {
//       req.rawBody = buf.toString(); // Save raw body for Stripe signature verification
//     }
//   }
// }));



app.use(express.json({ verify: (req: any, res, buf) => { req.rawBody = buf.toString(); } }));

// Routes
app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome To Property API!');
});



app.use(globalErrorHandler);
app.use(notFound);


process.on('SIGTERM', () => {
  console.log('SIGTERM received: closing server...');
  httpServer.close(() => console.log('Server closed.'));
});

export default httpServer;












