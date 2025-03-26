import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative h-[90vh] flex items-center">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0" 
        style={{ 
          backgroundImage: "url('/images/tattoo-hero-bg.jpg')",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60 z-0"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto relative z-10 px-6">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Art & Ink Jönköping
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 mb-8">
            Transforming your ideas into stunning tattoo art. Our skilled artists bring your vision to life with precision and creativity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-slate-800 hover:bg-slate-700 text-white">
              <Link href="#booking">Book Now</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-slate-900">
              <Link href="#instagram">Explore Our Work</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
