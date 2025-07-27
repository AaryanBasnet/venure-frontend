import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../auth/AuthProvider";
import {
  Speaker,
  Phone,
  Crown,
  CalendarCheck,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Wifi,
  ParkingCircle,
  Snowflake,
  Speaker as SoundSpeaker,
  UtensilsCrossed,
  ShieldCheck,
  Users,
  MapPin,
  DollarSign,
} from "lucide-react";
import { useVenueDetails } from "../../hooks/user/useVenueDetails";
import { useChat } from "../../hooks/useChat";
import VenueReviews from "../../components/user/VenueReviews";

const BASE_URL = "http://localhost:5050";

const amenityIcons = {
  Wifi: <Wifi size={28} className="stroke-1" />,
  Parking: <ParkingCircle size={28} className="stroke-1" />,
  "Air Conditioning": <Snowflake size={28} className="stroke-1" />,
  "Sound System": <SoundSpeaker size={28} className="stroke-1" />,
  Catering: <UtensilsCrossed size={28} className="stroke-1" />,
  Security: <ShieldCheck size={28} className="stroke-1" />,
};

const VenueDetails = () => {
  const { id } = useParams();
  const { isAuthenticated, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const { data: venue, isLoading, isError, error } = useVenueDetails(id);

  // Pass venue._id to useChat once venue is loaded
  const venueId = venue?._id || null;
  const { startChatWith, activeChat } = useChat(user, venueId);

  const [currentIndex, setCurrentIndex] = useState(0);
  const totalImages = venue?.venueImages?.length || 0;

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalImages - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === totalImages - 1 ? 0 : prev + 1));
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      navigate(`/checkout/${venue._id}`, { state: { venue } });
    }
  };

  const handleChatWithOwner = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const ownerId = venue?.owner?._id || venue?.owner;

    if (!ownerId || !venue?._id) {
      alert("Venue owner information unavailable");
      return;
    }

    try {
      const chat = await startChatWith(ownerId);
      navigate(`/chat`, {
        state: {
          chatId: chat._id,
          currentUserId: user._id, // the user who is initiating the chat
          venueId: venue._id, // optional if needed later
        },
      });
    } catch (err) {
      console.error("Failed to start chat", err);
      alert("Unable to start chat");
    }
  };
  // Loading & Error Handling
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-rose-200 border-t-rose-400 rounded-full animate-spin"></div>
          <div className="text-lg text-slate-600 font-light tracking-wide">
            Unveiling your venue...
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-rose-50 to-rose-100">
        <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-rose-200">
          <div className="text-lg text-rose-700 font-light">
            We encountered an issue: {error.message}
          </div>
        </div>
      </div>
    );
  }

  if (!venue) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200">
          <div className="text-lg text-slate-700 font-light">
            This exquisite venue awaits discovery elsewhere.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-16 font-light">
        {/* Elegant Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <Crown size={40} className="text-rose-400 stroke-1" />
          </div>
          <h1 className="text-6xl md:text-7xl font-extralight text-slate-800 mb-6 tracking-tight leading-none">
            {venue.venueName}
          </h1>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent mx-auto mb-8"></div>

          <div className="max-w-3xl mx-auto mb-8">
            <p className="text-xl text-slate-600 leading-relaxed font-light mb-8">
              {venue.description}
            </p>

            <div className="flex flex-wrap justify-center gap-8 text-slate-600">
              <div className="flex items-center space-x-2">
                <Users size={20} className="text-rose-400 stroke-1" />
                <span className="font-light">
                  Up to{" "}
                  <span className="font-medium text-slate-800">
                    {venue.capacity}
                  </span>{" "}
                  guests
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin size={20} className="text-rose-400 stroke-1" />
                <span className="font-light">
                  {venue.location.city}, {venue.location.state}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <div className="flex items-center space-x-2 text-3xl font-light text-slate-800">
              {/* <DollarSign size={28} className="text-rose-400 stroke-1" /> */}
              <span>Rs. {venue.pricePerHour}</span>
              <span className="text-lg text-slate-500">per hour</span>
            </div>

            <button className="flex items-center space-x-3 px-8 py-3 bg-white/70 backdrop-blur-sm border border-slate-200 text-slate-700 rounded-full hover:bg-white hover:shadow-lg transition-all duration-300 font-light group">
              <Phone
                size={18}
                className="stroke-1 group-hover:text-rose-400 transition-colors"
              />
              <span>Contact Host</span>
            </button>

            <button
              onClick={handleChatWithOwner}
              className="flex items-center space-x-3 px-8 py-3 bg-rose-400 text-white rounded-full hover:bg-rose-500 transition-all duration-300 font-light"
            >
              <Speaker size={18} className="stroke-1" />
              <span>Chat with Venue Owner</span>
            </button>
          </div>
        </div>

        {/* Refined Image Carousel */}
        <div className="relative w-full max-w-5xl mx-auto mb-20">
          <div className="relative aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl shadow-slate-300/50">
            {totalImages > 0 ? (
              <img
                src={`${BASE_URL}/${venue.venueImages[currentIndex].url}`}
                alt={`Venue ambiance ${currentIndex + 1}`}
                className="w-full h-full object-cover transition-all duration-700 ease-out hover:scale-[1.02]"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex flex-col items-center justify-center text-slate-400">
                <Sparkles size={48} className="mb-4 stroke-1" />
                <span className="text-lg font-light">Imagery coming soon</span>
              </div>
            )}

            {totalImages > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute top-1/2 left-8 -translate-y-1/2 w-14 h-14 bg-white/90 backdrop-blur-md text-slate-600 rounded-full shadow-lg hover:bg-white hover:scale-110 hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
                  aria-label="Previous image"
                >
                  <ArrowLeft
                    size={20}
                    className="stroke-1 group-hover:text-rose-400 transition-colors"
                  />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute top-1/2 right-8 -translate-y-1/2 w-14 h-14 bg-white/90 backdrop-blur-md text-slate-600 rounded-full shadow-lg hover:bg-white hover:scale-110 hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
                  aria-label="Next image"
                >
                  <ArrowRight
                    size={20}
                    className="stroke-1 group-hover:text-rose-400 transition-colors"
                  />
                </button>
              </>
            )}

            {totalImages > 0 && (
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-md text-white px-6 py-2 rounded-full text-sm font-light">
                {currentIndex + 1} of {totalImages}
              </div>
            )}
          </div>

          {/* Elegant dots indicator */}
          {totalImages > 1 && (
            <div className="flex justify-center mt-8 space-x-3">
              {venue.venueImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? "bg-rose-400 scale-125"
                      : "bg-slate-300 hover:bg-slate-400"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Sophisticated Amenities */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extralight text-slate-800 mb-4 tracking-wide">
              Curated Amenities
            </h2>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent mx-auto"></div>
          </div>

          {venue.amenities && venue.amenities.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {venue.amenities.map((amenity, idx) => (
                <div
                  key={idx}
                  className="group p-8 bg-white/60 backdrop-blur-sm rounded-2xl border border-slate-200/50 hover:bg-white hover:shadow-lg hover:border-rose-200 transition-all duration-300"
                >
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-rose-50 to-rose-100 rounded-2xl flex items-center justify-center text-rose-400 group-hover:from-rose-100 group-hover:to-rose-200 group-hover:text-rose-500 transition-all duration-300">
                      {amenityIcons[amenity] || (
                        <Sparkles size={28} className="stroke-1" />
                      )}
                    </div>
                    <h4 className="text-lg font-light text-slate-800">
                      {amenity}
                    </h4>
                    <p className="text-sm text-slate-500 font-light leading-relaxed">
                      Thoughtfully provided for your comfort and convenience
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center p-12 bg-white/40 backdrop-blur-sm rounded-2xl border border-slate-200/50">
              <Sparkles
                size={32}
                className="text-slate-400 mx-auto mb-4 stroke-1"
              />
              <div className="text-slate-500 font-light">
                Bespoke amenities to be revealed
              </div>
            </div>
          )}
        </div>

        {/* Elegant Booking Section */}
        <div className="max-w-4xl mx-auto">
          <div className="relative p-12 bg-gradient-to-br from-white/80 to-rose-50/80 backdrop-blur-sm rounded-3xl border border-slate-200/50 shadow-xl shadow-slate-300/20 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-rose-200/30 to-transparent rounded-full -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-rose-200/20 to-transparent rounded-full -ml-12 -mb-12"></div>

            <div className="relative text-center">
              <div className="flex justify-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-rose-400 to-rose-500 rounded-2xl flex items-center justify-center">
                  <Sparkles size={24} className="text-white stroke-1" />
                </div>
              </div>

              <h2 className="text-3xl font-extralight text-slate-800 mb-4 tracking-wide">
                Reserve Your Moment
              </h2>
              <p className="text-lg text-slate-600 font-light leading-relaxed mb-8 max-w-2xl mx-auto">
                Transform your vision into reality. Our exclusive venues are in
                high demand, with limited availability for the upcoming season.
              </p>

              <button
                onClick={handleCheckout}
                className="group inline-flex items-center space-x-3 px-12 py-4 bg-gradient-to-r from-rose-400 to-rose-500 text-white rounded-full hover:from-rose-500 hover:to-rose-600 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-rose-300/50"
              >
                <span className="text-lg font-light tracking-wide">
                  Begin Your Journey
                </span>
                <CalendarCheck
                  size={20}
                  className="stroke-1 group-hover:scale-110 transition-transform duration-300"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
      <VenueReviews
        venue={venue}
        user={user}
        isAuthenticated={isAuthenticated}
      />{" "}
    </div>
  );
};

export default VenueDetails;
