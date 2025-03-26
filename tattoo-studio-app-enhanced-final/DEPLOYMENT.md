# Deployment Instructions for Tattoo Studio Web Application

This document provides instructions for deploying the Tattoo Studio Web Application to a production environment.

## Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)
- A Firebase account for Cloud Storage integration
- A hosting service (Netlify, Vercel, or similar)

## Deployment Steps

### 1. Clone the Repository

```bash
git clone <repository-url>
cd tattoo-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Firebase

1. Create a new Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Enable Firebase Cloud Storage in your project
3. Update the Firebase configuration in `src/lib/firebase/config.ts` with your project credentials:

```typescript
export const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### 4. Build the Application

```bash
npm run build
```

This will create a production-ready build in the `out` directory.

### 5. Deploy to Hosting Service

#### Option 1: Deploy to Netlify

1. Install the Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Deploy to Netlify:
   ```bash
   netlify deploy
   ```

3. Follow the prompts to complete the deployment.

#### Option 2: Deploy to Vercel

1. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy to Vercel:
   ```bash
   vercel
   ```

3. Follow the prompts to complete the deployment.

#### Option 3: Deploy to Hostinger

1. Compress the `out` directory into a ZIP file:
   ```bash
   zip -r tattoo-app.zip out
   ```

2. Upload the ZIP file to your Hostinger account through the control panel.

3. Extract the ZIP file to your web root directory.

### 6. Configure Custom Domain (Optional)

If you have a custom domain, configure it through your hosting provider's dashboard.

## Admin Access

After deployment, you can access the admin dashboard at `/admin/login` with the following hardcoded credentials:

- Username: `admin`
- Password: `password123`

**Important:** For a production environment, it's recommended to change these credentials by updating the `src/lib/auth.ts` file before deployment.

## Firebase Cloud Storage Integration

The application uses Firebase Cloud Storage to store booking data. After deployment:

1. Make sure your Firebase project has the correct security rules for Cloud Storage:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /bookings/{bookingId} {
      allow read, write: if request.auth != null;
    }
    match /receipts/{receiptId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

2. Test the booking system to ensure data is being saved to Firebase Cloud Storage correctly.

## Troubleshooting

If you encounter any issues during deployment:

1. Check the browser console for any JavaScript errors
2. Verify that your Firebase configuration is correct
3. Ensure that Firebase Cloud Storage is properly set up and accessible
4. Check that the hosting service has all the necessary permissions to serve the application

## Support

For additional support, please contact the development team.
