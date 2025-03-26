import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-8 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Tattoo Studio</h3>
            <p className="text-slate-300">
              Professional tattoo studio offering custom designs, cover-ups, and more.
              Our experienced artists are dedicated to bringing your vision to life.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-slate-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#reviews" className="text-slate-300 hover:text-white transition-colors">
                  Reviews
                </Link>
              </li>
              <li>
                <Link href="#instagram" className="text-slate-300 hover:text-white transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="#faq" className="text-slate-300 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <address className="not-italic text-slate-300">
              <p>123 Tattoo Street</p>
              <p>Jönköping, Sweden</p>
              <p className="mt-2">Email: info@artsinkjonkoping.com</p>
              <p>Phone: +46 123 456 789</p>
            </address>
          </div>
        </div>
        <div className="border-t border-slate-700 mt-8 pt-6 text-center text-slate-400">
          <p>&copy; {new Date().getFullYear()} Tattoo Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
