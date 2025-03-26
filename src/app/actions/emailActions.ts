"use server";

import { sendBookingConfirmationEmail } from '@/lib/email';

export async function sendEmailAction(email, bookingData, receiptUrl) {
  return await sendBookingConfirmationEmail(email, bookingData, receiptUrl);
}
