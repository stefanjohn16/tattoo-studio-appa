// src/lib/firebase/index.ts
// Firebase initialization and exports

import { firebaseConfig } from './config';
import { 
  saveBooking, 
  getBookings, 
  getBookingById, 
  deleteBooking,
  BookingData 
} from './storage';

// Export Firebase functions
export {
  saveBooking,
  getBookings,
  getBookingById,
  deleteBooking,
  BookingData
};

// Export Firebase configuration
export { firebaseConfig };
