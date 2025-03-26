import { sendEmail } from './emailService';
import { format } from 'date-fns';

/**
 * Sends a booking confirmation email to the client
 * 
 * @param {string} email - Client's email address
 * @param {object} bookingData - Booking information
 * @param {string} receiptUrl - URL to the PDF receipt
 * @returns {Promise<boolean>} - Success status
 */
export const sendBookingConfirmationEmail = async (email, bookingData, receiptUrl) => {
  try {
    const subject = `Booking Confirmation - Art & Ink Jönköping`;
    
    const formattedDate = format(bookingData.date, 'EEEE, MMMM d, yyyy');
    
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #333; margin-bottom: 5px;">Booking Confirmation</h1>
          <p style="color: #666; font-size: 16px;">Thank you for booking with Art & Ink Jönköping!</p>
        </div>
        
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
          <h2 style="color: #333; font-size: 18px; margin-top: 0;">Appointment Details</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #666; width: 40%;">Artist:</td>
              <td style="padding: 8px 0; font-weight: bold;">${bookingData.artist?.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">Service:</td>
              <td style="padding: 8px 0; font-weight: bold;">${bookingData.service?.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">Date:</td>
              <td style="padding: 8px 0; font-weight: bold;">${formattedDate}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">Time:</td>
              <td style="padding: 8px 0; font-weight: bold;">${bookingData.time?.time}</td>
            </tr>
          </table>
        </div>
        
        <div style="margin-bottom: 20px;">
          <h2 style="color: #333; font-size: 18px;">Your Information</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #666; width: 40%;">Name:</td>
              <td style="padding: 8px 0;">${bookingData.clientName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">Email:</td>
              <td style="padding: 8px 0;">${bookingData.clientEmail}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">Phone:</td>
              <td style="padding: 8px 0;">${bookingData.clientPhone}</td>
            </tr>
          </table>
        </div>
        
        <div style="background-color: #fff4e5; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
          <h2 style="color: #e67700; font-size: 18px; margin-top: 0;">Important Information</h2>
          <ul style="color: #855200; padding-left: 20px; margin-bottom: 0;">
            <li>Please arrive 15 minutes before your appointment time.</li>
            <li>Bring a valid photo ID to verify your age.</li>
            <li>A 20% deposit will be required to secure your booking.</li>
            <li>Cancellations must be made at least 48 hours in advance for a full deposit refund.</li>
          </ul>
        </div>
        
        <div style="text-align: center; margin-top: 30px;">
          <a href="${receiptUrl}" style="display: inline-block; background-color: #4a5568; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">Download Receipt</a>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; text-align: center; color: #666; font-size: 14px;">
          <p>If you have any questions, please contact us at:</p>
          <p>Email: info@artinkjonkoping.com | Phone: +46 123 456 789</p>
          <p>Art & Ink Jönköping, Tattoo Studio</p>
        </div>
      </div>
    `;
    
    await sendEmail(email, subject, htmlContent, receiptUrl);
    return true;
  } catch (error) {
    console.error('Error sending booking confirmation email:', error);
    return false;
  }
};
