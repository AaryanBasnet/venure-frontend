import SectionHeading from "../../../components/ui/SectionHeading";
import { testimonialsIntro, testimonials } from "../content/landingContent";
import TestimonialCard from "../components/TestimonialCard";

// Figma 46:214 — three flip cards, photo front / quote back.
export default function TestimonialsSection() {
  return (
    <section id="testimonials" aria-labelledby="testimonials-title" className="bg-sand py-16 lg:py-[74px]">
      <div className="container-site">
        <SectionHeading
          id="testimonials-title"
          eyebrow={testimonialsIntro.eyebrow}
          title={testimonialsIntro.title}
          accent={testimonialsIntro.accent}
        />
        <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} />
          ))}
        </ul>
      </div>
    </section>
  );
}
