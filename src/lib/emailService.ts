"use server";

import nodemailer from 'nodemailer';

// Configure email transport
// In production, you would use your actual SMTP credentials
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.example.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@example.com',
    pass: process.env.EMAIL_PASSWORD || 'your-password',
  },
});

/**
 * Sends an email with optional attachment
 * 
 * @param {string} to - Recipient email address
 * @param {string} subject - Email subject
 * @param {string} htmlContent - HTML content of the email
 * @param {string} attachmentUrl - Optional URL to attachment
 * @returns {Promise<boolean>} - Success status
 */
export const sendEmail = async (to, subject, htmlContent, attachmentUrl = null) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM || '"Art & Ink Jönköping" <info@artinkjonkoping.com>',
      to,
      subject,
      html: htmlContent,
    };

    // Add attachment if URL is provided
    if (attachmentUrl) {
      mailOptions.attachments = [
        {
          filename: 'booking-receipt.pdf',
          path: attachmentUrl,
        },
      ];
    }

    // In development/demo mode, log the email instead of sending it
    if (process.env.NODE_ENV === 'development' || process.env.DEMO_MODE === 'true') {
      console.log('Email would be sent:', {
        to,
        subject,
        attachmentUrl: attachmentUrl || 'None',
      });
      return true;
    }

    // Send email in production
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

/**
 * Sends a notification email to the admin
 * 
 * @param {object} bookingData - Booking information
 * @returns {Promise<boolean>} - Success status
 */
export const sendAdminNotificationEmail = async (bookingData) => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@artinkjonkoping.com';
    const subject = `New Booking: ${bookingData.clientName} - ${bookingData.service?.name}`;
    
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <h1 style="color: #333; margin-bottom: 20px;">New Booking Notification</h1>
        
        <div style="background-color: #f0f4f8; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
          <h2 style="color: #2c5282; font-size: 18px; margin-top: 0;">Booking Details</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #4a5568; width: 40%;">Artist:</td>
              <td style="padding: 8px 0; font-weight: bold;">${bookingData.artist?.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #4a5568;">Service:</td>
              <td style="padding: 8px 0; font-weight: bold;">${bookingData.service?.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #4a5568;">Date & Time:</td>
              <td style="padding: 8px 0; font-weight: bold;">
                ${new Date(bookingData.date).toLocaleDateString()} at ${bookingData.time?.time}
              </td>
            </tr>
          </table>
        </div>
        
        <div style="margin-bottom: 20px;">
          <h2 style="color: #333; font-size: 18px;">Client Information</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #4a5568; width: 40%;">Name:</td>
              <td style="padding: 8px 0;">${bookingData.clientName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #4a5568;">Email:</td>
              <td style="padding: 8px 0;">${bookingData.clientEmail}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #4a5568;">Phone:</td>
              <td style="padding: 8px 0;">${bookingData.clientPhone}</td>
            </tr>
          </table>
        </div>
        
        ${bookingData.notes ? `
        <div style="margin-bottom: 20px;">
          <h2 style="color: #333; font-size: 18px;">Additional Notes</h2>
          <p style="background-color: #f9f9f9; padding: 10px; border-radius: 4px;">${bookingData.notes}</p>
        </div>
        ` : ''}
        
        <div style="text-align: center; margin-top: 30px;">
          <a href="${process.env.ADMIN_URL || 'https://artinkjonkoping.com/admin'}/dashboard/bookings" 
             style="display: inline-block; background-color: #4a5568; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">
            View in Admin Dashboard
          </a>
        </div>
      </div>
    `;
    
    await sendEmail(adminEmail, subject, htmlContent);
    return true;
  } catch (error) {
    console.error('Error sending admin notification email:', error);
    return false;
  }
};
