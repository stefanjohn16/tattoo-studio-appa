import GoogleReviews from "./GoogleReviews";

export default function ReviewsSection() {
  return (
    <section id="reviews" className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">What Our Clients Say</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Read reviews from our satisfied clients and see why they choose Art & Ink Jönköping for their tattoo needs.
          </p>
        </div>

        <div className="mb-10">
          <GoogleReviews />
        </div>

        <div className="text-center">
          <p className="text-slate-600">
            Don't just take our word for it - see what our clients have to say about their experiences with our talented artists.
          </p>
        </div>
      </div>
    </section>
  );
}
