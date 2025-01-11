/* eslint-disable @typescript-eslint/no-explicit-any */
import nodemailer from 'nodemailer';
import config from '../config';

// export const sendEmail = async (clientEmail: string, html: any) => {

//   const transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 587,
//     secure: config.NODE_ENV === 'production',
//     auth: {
//       user: 'performroomuk@gmail.com', // Admin's Gmail account
//       pass: 'pfpc nmty cdep mhou', // Replace with your actual password or use an environment variable for security
//     },
//   });

//   await transporter.sendMail({
//     to: 'performroomuk@gmail.com', // This is required to match the authenticated account
//     from: `"Client Inquiry" ${clientEmail}`, // Admin email where the message will be received
//     replyTo: clientEmail, // Client’s email for reply-to (dynamic and changes per client)
//     subject: 'Help Request from User!', // Subject line
//     text: '', // Plain text body
//     html, // HTML body
//   });
// };
export class SendEmail {
  private static transporter = nodemailer.createTransport({
    service: 'gmail', // Or use another email service
    auth: {
      pass: config.email_app_password, // Your email password
      user: config.admin_email_user, // Your email
      // user: "ahmadmusa9805@gmail.com"	, // Your email
      // pass: "sjks gstg nvfn qrfm", // Your email password
    },
  });

  static async sendOTPEmail(email: string, otp: string): Promise<void> {
    const mailOptions = {
      // from: process.env.EMAIL_USER, // Sender email address
      from: "ahmadmusa9805@gmail.com", // Sender email address
      to: email, // Recipient email
      subject: 'Your OTP for Verification',
      text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`OTP sent to ${email}`);
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send OTP email.');
    }
  }
  static async sendQuoteEmailToClient(email: string, password: any, quote: string): Promise<void> {
    const mailOptions = {
      // from: process.env.EMAIL_USER, // Sender email address
      from: "ahmadmusa9805@gmail.com", // Sender email address
      to: email, // Recipient email
      subject: 'Your Accoount And Quote Is Created',
      text: `Your Account and Quote is created. Account: ${email} and password: ${password}. Quote: ${quote}.`,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`OTP sent to ${email}`);
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send OTP email.');
    }
  }
  static async sendResetLinkToEmail(email: string, resetLink: string): Promise<void> {
    const mailOptions = {
      // from: process.env.EMAIL_USER, // Sender email address
      from: "ahmadmusa9805@gmail.com", // Sender email address
      to: email, // Recipient email
      subject: 'Your resetLink for Change Password',
      text: `Your resetLink is & It is valid for 10 minutes. Link: ${resetLink}`,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`OTP sent to ${email}`);
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send Rset Link email.');
    }
  }
}

