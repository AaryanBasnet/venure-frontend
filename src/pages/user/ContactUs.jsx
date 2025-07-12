import React, { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Calendar,
  Star,
  Sparkles,
  Crown,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import useSubmitContact from "../../hooks/useSubmitContact";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    guestCount: "",
    date: "",
    budget: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const { mutateAsync: submitContact, isPending } = useSubmitContact();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitContact(formData);
      setIsSubmitted(true);
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", phone: "", message: "" });
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (err) {
      toast.error("Failed to send message");
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      detail: "+1 (555) 123-4567",
      subtitle: "Mon-Fri 9AM-8PM EST",
      color: "text-rose-500",
    },
    {
      icon: Mail,
      title: "Email",
      detail: "hello@premiumvenues.com",
      subtitle: "We reply within 2 hours",
      color: "text-pink-500",
    },
    {
      icon: MapPin,
      title: "Office",
      detail: "123 Luxury Avenue, NYC",
      subtitle: "By appointment only",
      color: "text-purple-500",
    },
    {
      icon: Clock,
      title: "Support Hours",
      detail: "24/7 Available",
      subtitle: "Emergency support anytime",
      color: "text-yellow-500",
    },
  ];

  const eventTypes = [
    "Wedding Reception",
    "Corporate Event",
    "Birthday Party",
    "Anniversary",
    "Baby Shower",
    "Graduation Party",
    "Holiday Party",
    "Other",
  ];

  const budgetRanges = [
    "Under $5,000",
    "$5,000 - $10,000",
    "$10,000 - $25,000",
    "$25,000 - $50,000",
    "$50,000 - $100,000",
    "Over $100,000",
  ];

  return (
    <div className="min-h-screen bg-slate-50 overflow-hidden">
      {/* Animated Background Particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse rounded-full opacity-20"
            style={{
              width: Math.random() * 4 + 2 + "px",
              height: Math.random() * 4 + 2 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              animationDelay: Math.random() * 3 + "s",
              animationDuration: Math.random() * 3 + 2 + "s",
              background: `linear-gradient(45deg, #e11d48, #db2777, #7e22ce)`,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto text-center text-white px-6">
          <div className="mb-8 inline-flex items-center space-x-2 bg-gradient-to-r from-rose-500/20 to-pink-500/20 backdrop-blur-sm rounded-full px-4 py-2 border border-rose-300/30">
            <MessageCircle className="w-5 h-5 text-rose-400 animate-pulse" />
            <span className="text-sm font-medium text-rose-100">
              Let's Talk
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-rose-200 to-pink-200 bg-clip-text text-transparent">
            Get in Touch
          </h1>

          <p className="text-xl md:text-2xl mb-8 text-slate-300 font-light leading-relaxed max-w-2xl mx-auto">
            Ready to create an extraordinary celebration? Our expert team is
            here to bring your vision to life
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="group p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-200 hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="mb-4">
                  <div
                    className={`w-12 h-12 rounded-full bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform`}
                  >
                    <info.icon className="w-6 h-6 text-white" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-800 mb-2">
                  {info.title}
                </h3>
                <p className="text-slate-900 font-medium mb-1">{info.detail}</p>
                <p className="text-slate-500 text-sm">{info.subtitle}</p>

                {hoveredCard === index && (
                  <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-pink-500/10 rounded-2xl pointer-events-none" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
              Plan Your Perfect
              <span className="bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
                {" "}
                Event
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Tell us about your vision and we'll help you find the perfect
              venue
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-slate-200">
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">
                  Thank You!
                </h3>
                <p className="text-slate-600 text-lg">
                  We've received your message and will get back to you within 2
                  hours.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Basic Info */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-slate-700 font-medium mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-medium mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-slate-700 font-medium mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition-all"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition-all resize-none"
                    placeholder="Tell us about your vision, special requirements, or any questions you have..."
                  />
                </div>

                <div className="text-center">
                  <button
                    onClick={handleSubmit}
                    className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-8 py-4 rounded-full font-medium hover:from-rose-600 hover:to-pink-600 transition-all transform hover:scale-105 flex items-center space-x-2 mx-auto"
                  >
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Why Choose Our
              <span className="bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
                {" "}
                Expert Team
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-200">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-rose-500 to-pink-500 rounded-full flex items-center justify-center">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-slate-800 mb-2">
                2 Hours
              </div>
              <div className="text-slate-600">Average Response Time</div>
            </div>

            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-200">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-rose-500 to-pink-500 rounded-full flex items-center justify-center">
                <Star className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-slate-800 mb-2">
                4.9/5
              </div>
              <div className="text-slate-600">Client Satisfaction</div>
            </div>

            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-200">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-rose-500 to-pink-500 rounded-full flex items-center justify-center">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-slate-800 mb-2">15+</div>
              <div className="text-slate-600">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-rose-500/20 to-pink-500/20 backdrop-blur-sm rounded-full px-4 py-2 border border-rose-300/30">
              <Sparkles className="w-4 h-4 text-rose-400" />
              <span className="text-sm font-medium text-rose-100">
                Premium Support
              </span>
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Need immediate
            <span className="bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent">
              {" "}
              assistance?
            </span>
          </h2>

          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Our dedicated team is available 24/7 for urgent inquiries and
            last-minute bookings
          </p>

          <div className="flex justify-center">
            <a
              href="tel:+15551234567"
              className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-8 py-4 rounded-full font-medium hover:from-rose-600 hover:to-pink-600 transition-all transform hover:scale-105 flex items-center space-x-2"
            >
              <Phone className="w-5 h-5" />
              <span>Call Now: (555) 123-4567</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
