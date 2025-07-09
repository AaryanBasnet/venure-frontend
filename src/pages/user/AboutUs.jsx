import React, { useState, useEffect } from 'react';
import { Star, Award, Users, Calendar, Check, ChevronRight, Sparkles, Heart, Shield, Crown, Trophy, MapPin, Clock, Camera, Music, Utensils, Gem } from 'lucide-react';

const AboutUs = () => {
  const [currentStat, setCurrentStat] = useState(0);
  const [hoveredTeam, setHoveredTeam] = useState(null);

  const stats = [
    { number: '2500+', label: 'Venues Curated', icon: MapPin, color: 'text-rose-500' },
    { number: '50K+', label: 'Events Hosted', icon: Calendar, color: 'text-purple-500' },
    { number: '100K+', label: 'Happy Guests', icon: Users, color: 'text-pink-500' },
    { number: '4.9/5', label: 'Guest Rating', icon: Star, color: 'text-yellow-500' }
  ];

  const features = [
    {
      icon: Crown,
      title: 'Curated Excellence',
      description: 'Each venue undergoes rigorous selection ensuring only the finest spaces for your celebration',
      color: 'text-rose-500'
    },
    {
      icon: Shield,
      title: 'Trusted Partners',
      description: 'Verified vendors and 24/7 support ensuring seamless, worry-free event planning',
      color: 'text-purple-500'
    },
    {
      icon: Gem,
      title: 'Bespoke Experiences',
      description: 'Tailored recommendations matching your vision with personalized concierge service',
      color: 'text-pink-500'
    },
    {
      icon: Trophy,
      title: 'Award-Winning Service',
      description: 'Industry recognition for exceptional quality and innovative event solutions',
      color: 'text-yellow-500'
    }
  ];

  const teamMembers = [
    {
      name: 'Sophia Chen',
      role: 'Chief Experience Officer',
      image: '/api/placeholder/300/300',
      bio: 'Former luxury hotel director with 15+ years crafting memorable celebrations'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Venue Relations Director',
      image: '/api/placeholder/300/300',
      bio: 'Expert in curating exclusive partnerships with premium venues worldwide'
    },
    {
      name: 'Elena Rossi',
      role: 'Creative Director',
      image: '/api/placeholder/300/300',
      bio: 'Visionary designer specializing in luxury event aesthetics and experiences'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 overflow-hidden">
      {/* Animated Background Particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse rounded-full opacity-20"
            style={{
              width: Math.random() * 6 + 2 + 'px',
              height: Math.random() * 6 + 2 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDelay: Math.random() * 3 + 's',
              animationDuration: (Math.random() * 3 + 2) + 's',
              background: `linear-gradient(45deg, #e11d48, #db2777, #7e22ce)`
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 opacity-95" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        
        <div className="relative z-10 text-center text-white px-6 max-w-4xl">
          <div className="mb-8 inline-flex items-center space-x-2 bg-gradient-to-r from-rose-500/20 to-pink-500/20 backdrop-blur-sm rounded-full px-4 py-2 border border-rose-300/30">
            <Sparkles className="w-5 h-5 text-rose-400 animate-pulse" />
            <span className="text-sm font-medium text-rose-100">Premium Venue Experiences</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-rose-200 to-pink-200 bg-clip-text text-transparent">
            Crafting Extraordinary
            <span className="block italic text-rose-400">Moments</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-slate-300 font-light leading-relaxed">
            Where luxury meets celebration, and every detail whispers elegance
          </p>
          
          <div className="flex justify-center">
            <button className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-8 py-3 rounded-full font-medium hover:from-rose-600 hover:to-pink-600 transition-all transform hover:scale-105 flex items-center space-x-2">
              <Crown className="w-5 h-5" />
              <span>Explore Our Venues</span>
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`text-center p-8 rounded-2xl transition-all duration-500 transform hover:scale-105 ${
                  currentStat === index
                    ? 'bg-gradient-to-br from-rose-50 to-pink-50 shadow-xl'
                    : 'bg-slate-50 hover:bg-gradient-to-br hover:from-rose-50 hover:to-pink-50'
                }`}
              >
                <div className="mb-4 flex justify-center">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center`}>
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="text-4xl font-bold text-slate-800 mb-2">{stat.number}</div>
                <div className="text-slate-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-6">
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                  <Heart className="w-4 h-4" />
                  <span>Our Story</span>
                </div>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
                Born from a passion for
                <span className="bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent"> perfection</span>
              </h2>
              
              <div className="space-y-6 text-slate-300 text-lg leading-relaxed">
                <p>
                  Founded by a team of luxury hospitality experts, we discovered that finding the perfect venue was often the greatest challenge in creating unforgettable celebrations.
                </p>
                <p>
                  From intimate gatherings to grand celebrations, we curate only the most exceptional spaces that embody elegance, sophistication, and timeless charm.
                </p>
                <p>
                  Today, we're proud to be the trusted partner for discerning hosts who refuse to compromise on quality.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative z-10 bg-gradient-to-br from-rose-500 via-pink-500 to-purple-600 rounded-2xl p-8 shadow-2xl">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">2015</div>
                    <div className="text-pink-100 text-sm">Founded</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">50+</div>
                    <div className="text-pink-100 text-sm">Cities</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">98%</div>
                    <div className="text-pink-100 text-sm">Satisfaction</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">24/7</div>
                    <div className="text-pink-100 text-5">Support</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-4 -right-4 w-full h-full bg-gradient-to-br from-yellow-400 to-orange-400 rounded-2xl -z-10 blur-sm opacity-50" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
              Why Choose Our
              <span className="bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent"> Premium Collection</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Every detail meticulously curated to ensure your celebration exceeds expectations
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-200 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="mb-6">
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-slate-800 mb-4">{feature.title}</h3>
                <p className="text-slate-600 text-lg leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
              Meet Our
              <span className="bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent"> Expert Team</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Passionate professionals dedicated to bringing your vision to life
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="group relative"
                onMouseEnter={() => setHoveredTeam(index)}
                onMouseLeave={() => setHoveredTeam(null)}
              >
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-rose-50 to-pink-50 p-8 transition-all duration-300 transform group-hover:scale-105">
                  <div className="relative z-10">
                    <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-rose-500 to-pink-500 p-1">
                      <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                        <span className="text-3xl font-bold text-slate-800">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-slate-800 mb-2">{member.name}</h3>
                    <p className="text-rose-500 font-medium mb-4">{member.role}</p>
                    <p className="text-slate-600 leading-relaxed">{member.bio}</p>
                  </div>
                  
                  {hoveredTeam === index && (
                    <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-pink-500/10 pointer-events-none" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              <span>Ready to Begin?</span>
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Let's create your perfect
            <span className="bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent"> celebration</span>
          </h2>
          
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied hosts who trusted us to make their special moments extraordinary
          </p>
          
          <div className="flex justify-center">
            <button className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-8 py-4 rounded-full font-medium hover:from-rose-600 hover:to-pink-600 transition-all transform hover:scale-105 flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Start Planning</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;