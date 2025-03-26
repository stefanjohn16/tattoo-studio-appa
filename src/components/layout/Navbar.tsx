import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  return (
    <nav className="bg-slate-900 text-white py-4 px-6 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Tattoo Studio
        </Link>
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="hover:text-slate-300 transition-colors">
            Home
          </Link>
          <Link href="#reviews" className="hover:text-slate-300 transition-colors">
            Reviews
          </Link>
          <Link href="#instagram" className="hover:text-slate-300 transition-colors">
            Gallery
          </Link>
          <Link href="#faq" className="hover:text-slate-300 transition-colors">
            FAQ
          </Link>
        </div>
        <Button variant="outline" className="border-white text-white hover:bg-white hover:text-slate-900">
          Book Now
        </Button>
      </div>
    </nav>
  );
}
