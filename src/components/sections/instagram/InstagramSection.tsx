import InstagramEmbed from "./InstagramEmbed";

export default function InstagramSection() {
  return (
    <section id="instagram" className="py-16 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Follow Our Work</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Check out our latest tattoo designs and artwork on Instagram.
          </p>
        </div>

        <div className="mb-10">
          <InstagramEmbed />
        </div>

        <div className="text-center">
          <p className="text-slate-600">
            Follow us on Instagram <a href="https://www.instagram.com/artsinkjonkoping" target="_blank" rel="noopener noreferrer" className="text-slate-900 font-medium hover:underline">@artsinkjonkoping</a> for daily updates and inspiration.
          </p>
        </div>
      </div>
    </section>
  );
}
