/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import config from "../config";


export const emailValidate = async(email: string) => {
     // Validate the email using MailboxLayer

     const emailValidationResponse = await axios.get(config.mailbox_layer_url as any, {
        params: {
          access_key: config.mailbox_layer_key as any,
          email: email,
          smtp: 1,
          format: 1,
        },
      });
  
      const validation = emailValidationResponse.data;
  
      if (!validation.format_valid) {
        throw new Error('Invalid email format.');
      }
  
      if (!validation.mx_found) {
        throw new Error('Email domain does not have valid mail servers.');
      }
  
      if (validation.disposable) {
        throw new Error('Disposable email addresses are not allowed.');
      }
  
      if (validation.role) {
        throw new Error('Role-based email addresses are not allowed.');
      }
  
      if (validation.score < 0.5) {
        throw new Error('Email validation score is too low, indicating an unreliable email.');
      }

      if (!validation.smtp_check) {
        // console.warn('SMTP validation failed. Email may be temporarily unavailable.');
        throw new Error('Email validation score is too low, indicating an unreliable email. by smtp');

      }

  // SMTP validation warning and flagging
  // const smtp_check = validation.smtp_check;
  // return { valid: smtp_check, flag: !smtp_check }; // Return the SMTP validation status and flag

      return true
}