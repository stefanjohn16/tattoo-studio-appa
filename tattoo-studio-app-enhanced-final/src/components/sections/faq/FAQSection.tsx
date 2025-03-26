import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function FAQSection() {
  return (
    <section id="faq" className="py-16 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Find answers to common questions about our tattoo services, aftercare, and booking process.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left text-lg font-medium">
                How do I prepare for my tattoo appointment?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                <p>Before your appointment, make sure to:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Stay hydrated and drink plenty of water</li>
                  <li>Eat a good meal before your session</li>
                  <li>Get a good night's sleep</li>
                  <li>Avoid alcohol for at least 24 hours before your appointment</li>
                  <li>Moisturize your skin in the days leading up to your appointment</li>
                  <li>Wear comfortable, loose clothing that provides easy access to the tattoo area</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left text-lg font-medium">
                What should I avoid after getting a tattoo?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                <p>After getting your tattoo, avoid the following for at least 2 weeks:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Swimming, hot tubs, and long baths</li>
                  <li>Direct sunlight and tanning beds</li>
                  <li>Tight or restrictive clothing over the tattooed area</li>
                  <li>Heavy exercise that might cause excessive sweating</li>
                  <li>Picking or scratching at the tattoo</li>
                  <li>Applying alcohol-based products to the tattoo</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left text-lg font-medium">
                Do you offer consultations?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                Yes, we offer free consultations for all tattoo projects. During your consultation, you'll meet with one of our artists to discuss your design ideas, placement, size, and any questions you might have. This helps us understand your vision and provide you with a time and cost estimate.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="text-left text-lg font-medium">
                How much will my tattoo cost?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                Tattoo pricing depends on several factors including size, complexity, placement, and the amount of time required. Our artists charge by the hour for larger pieces, while smaller tattoos may have a minimum set price. During your consultation, we'll provide you with a detailed estimate based on your specific design.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger className="text-left text-lg font-medium">
                What is your cancellation policy?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                We require at least 48 hours notice for cancellations or rescheduling. Late cancellations or no-shows may result in the loss of your deposit. We understand that emergencies happen, so please contact us as soon as possible if you need to change your appointment.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger className="text-left text-lg font-medium">
                Do I need to be 18 to get a tattoo?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                Yes, you must be at least 18 years old to get a tattoo at our studio. We require a valid government-issued photo ID as proof of age, regardless of how old you appear. This is a legal requirement that we strictly enforce.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
}
