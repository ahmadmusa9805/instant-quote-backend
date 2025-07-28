/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import notFound from './app/middlewares/notFound.js';
import router from './app/routes/index.js';
import { createServer } from 'http';
import helmet from 'helmet';
// import config from './app/config';
import globalErrorHandler from './app/middlewares/globalErrorhandler.js';
// import { uploadFileS3 } from './app/utils/UploaderS3.js';
const app: Application = express();
const httpServer = createServer(app);

// Middleware
app.use(helmet()); // Security headers
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(
  cors({
    // origin:["http://localhost:5173"],
    origin:"*",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    // origin: ['http://192.168.12.63:5173', 'http://192.168.12.63:3001', 'http://34.233.41.57:3000', 'http://34.233.41.57:3001',],
    // credentials: true,
  })
);

app.use(express.json({ verify: (req: any, res, buf) => { req.rawBody = buf.toString(); } }));




// Routes
app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome To Property-Development API !');
});

// app.post('/upload/single',  uploadFileS3(true).single('img'), (req: Request, res: Response) => {
//     try {
//         if (!req.file) {
//             return res.status(400).json({ success: false, message: 'No file uploaded' });
//         }
//         const file = req.file as Express.MulterS3.File;
//         res.status(200).json({
//             success: true,
//             message: 'File uploaded successfully',
//             data: {
//                 url: file.location,
//                 key: file.key,
//                 mimetype: file.mimetype,
//                 size: file.size
//             }
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error instanceof Error ? error.message : 'File upload failed'
//         });
//     }
// });

app.use(globalErrorHandler);
app.use(notFound);

process.on('SIGTERM', () => {
  // eslint-disable-next-line no-console
  console.log('SIGTERM received: closing server...');
  // eslint-disable-next-line no-console
  httpServer.close(() => console.log('Server closed.'));
});

export default httpServer;
