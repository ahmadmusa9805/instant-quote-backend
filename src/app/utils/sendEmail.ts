/* eslint-disable @typescript-eslint/no-explicit-any */
import nodemailer from 'nodemailer';
import config from '../config';
import fs from 'fs';
// import path from 'path';
import dotenv from 'dotenv';
import * as path from 'path';

dotenv.config();

export class SendEmail {
  private static transporter = nodemailer.createTransport({
    service: 'gmail', // Or use another email service
    auth: {
      pass: config.email_app_password, // Your email password
      user: config.admin_email_user, // Your email
    },
    tls: {
    rejectUnauthorized: false, // <-- allows self-signed certs
  },
  });

  static async sendOTPEmail(email: string, otp: string): Promise<void> {
    const mailOptions = {
      // from: process.env.EMAIL_USER, // Sender email address
      from: config.admin_email_user, // Sender email address
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
  static async sendQuoteEmailToClient(email: string): Promise<void> {
   console.log('email=======musa', email);
  // Read the HTML template file
  const templatePath = path.join(process.cwd(), 'src', 'app', 'utils', 'quotationTemplate.html');
  const htmlTemplate = fs.readFileSync(templatePath, 'utf-8');

    const mailOptions = {
      // from: process.env.EMAIL_USER, // Sender email address
      from: config.admin_email_user, // Sender email address
      to: email, // Recipient email
      subject: 'Your Accoount And Quote Is Created',
      html:htmlTemplate,
    };
    try {
         console.log('mailOptions=======musa', mailOptions);

      await this.transporter.sendMail(mailOptions);
      console.log(`OTP sent to ${email}`);
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email.');
    }
  }
  static async sendResetLinkToEmail(email: string, resetLink: string): Promise<void> {
    const mailOptions = {
      // from: process.env.EMAIL_USER, // Sender email address
      from: config.admin_email_user, // Sender email address
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

