# Tattoo Studio Web Application

A modern, responsive web application for a tattoo studio with booking functionality, admin dashboard, and external content integration.

## Features

- **Modern Design**: Built with Next.js, TypeScript, Tailwind CSS, and Shadcn UI components
- **Responsive Layout**: Fully responsive design that works on desktop, tablet, and mobile devices
- **Hero Section**: Visually striking introduction with call-to-action buttons
- **Reviews Section**: Google Reviews embedding to showcase customer testimonials
- **Instagram Integration**: Embedded Instagram feed to display the studio's latest work
- **FAQ Section**: Collapsible accordion with common questions and answers
- **Admin Dashboard**: Secure admin area with hardcoded credentials
- **Booking System**: Multi-step booking process with artist selection, service selection, date/time picking, and age verification
- **Firebase Integration**: Cloud Storage for storing booking data and receipts

## Tech Stack

- **Frontend**: Next.js with TypeScript
- **Styling**: Tailwind CSS with Shadcn UI components
- **State Management**: React Context API
- **Storage**: Firebase Cloud Storage
- **PDF Generation**: Utility for generating booking receipts

## Project Structure

```
tattoo-app/
├── public/              # Static assets
├── src/
│   ├── app/             # Next.js app router pages
│   │   ├── admin/       # Admin dashboard pages
│   │   │   ├── login/   # Admin login page
│   │   │   └── dashboard/ # Admin dashboard pages
│   │   └── page.tsx     # Homepage
│   ├── components/      # React components
│   │   ├── ui/          # UI components from Shadcn
│   │   ├── layout/      # Layout components (Navbar, Footer)
│   │   └── sections/    # Page sections (Hero, Reviews, Instagram, FAQ)
│   ├── lib/             # Utility functions and libraries
│   │   ├── firebase/    # Firebase configuration and utilities
│   │   ├── auth.ts      # Authentication utilities
│   │   └── pdf.ts       # PDF generation utilities
│   └── styles/          # Global styles
└── DEPLOYMENT.md        # Deployment instructions
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd tattoo-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Admin Access

You can access the admin dashboard at `/admin/login` with the following credentials:

- Username: `admin`
- Password: `password123`

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Firebase](https://firebase.google.com/)
