// src/lib/firebase/client.ts
// Firebase client initialization for browser environment

import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL, listAll, deleteObject } from 'firebase/storage';
import { firebaseConfig } from './config';
import { BookingData } from './storage';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// Save booking data to Firebase Cloud Storage
export async function saveBookingToCloudStorage(bookingData: BookingData): Promise<string> {
  try {
    // Create a reference to the booking file
    const bookingRef = ref(storage, `bookings/${bookingData.id}.json`);
    
    // Convert booking data to JSON string
    const bookingJson = JSON.stringify(bookingData);
    
    // Convert string to Blob
    const bookingBlob = new Blob([bookingJson], { type: 'application/json' });
    
    // Upload the booking data
    await uploadBytes(bookingRef, bookingBlob);
    
    // Get the download URL
    const downloadURL = await getDownloadURL(bookingRef);
    
    return downloadURL;
  } catch (error) {
    console.error('Error saving booking to Firebase Cloud Storage:', error);
    throw error;
  }
}

// Get all bookings from Firebase Cloud Storage
export async function getBookingsFromCloudStorage(): Promise<BookingData[]> {
  try {
    // Create a reference to the bookings folder
    const bookingsRef = ref(storage, 'bookings');
    
    // List all items in the bookings folder
    const bookingsList = await listAll(bookingsRef);
    
    // Get download URLs for all booking files
    const bookingsPromises = bookingsList.items.map(async (itemRef) => {
      const downloadURL = await getDownloadURL(itemRef);
      const response = await fetch(downloadURL);
      const bookingData = await response.json();
      return bookingData as BookingData;
    });
    
    // Wait for all promises to resolve
    const bookings = await Promise.all(bookingsPromises);
    
    return bookings;
  } catch (error) {
    console.error('Error getting bookings from Firebase Cloud Storage:', error);
    return [];
  }
}

// Delete a booking from Firebase Cloud Storage
export async function deleteBookingFromCloudStorage(bookingId: string): Promise<boolean> {
  try {
    // Create a reference to the booking file
    const bookingRef = ref(storage, `bookings/${bookingId}.json`);
    
    // Delete the booking file
    await deleteObject(bookingRef);
    
    return true;
  } catch (error) {
    console.error('Error deleting booking from Firebase Cloud Storage:', error);
    return false;
  }
}

// Save receipt PDF to Firebase Cloud Storage
export async function saveReceiptToCloudStorage(bookingId: string, pdfBlob: Blob): Promise<string> {
  try {
    // Create a reference to the receipt file
    const receiptRef = ref(storage, `receipts/${bookingId}.pdf`);
    
    // Upload the receipt PDF
    await uploadBytes(receiptRef, pdfBlob);
    
    // Get the download URL
    const downloadURL = await getDownloadURL(receiptRef);
    
    return downloadURL;
  } catch (error) {
    console.error('Error saving receipt to Firebase Cloud Storage:', error);
    throw error;
  }
}
