/* eslint-disable @typescript-eslint/no-explicit-any */
import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (clientEmail: string, html: any) => {

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.NODE_ENV === 'production',
    auth: {
      user: 'performroomuk@gmail.com', // Admin's Gmail account
      pass: 'pfpc nmty cdep mhou', // Replace with your actual password or use an environment variable for security
    },
  });

  await transporter.sendMail({
    to: 'performroomuk@gmail.com', // This is required to match the authenticated account
    from: `"Client Inquiry" ${clientEmail}`, // Admin email where the message will be received
    replyTo: clientEmail, // Client’s email for reply-to (dynamic and changes per client)
    subject: 'Help Request from User!', // Subject line
    text: '', // Plain text body
    html, // HTML body
  });
};
