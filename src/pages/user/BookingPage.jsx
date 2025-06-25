import React, { useState, useEffect } from "react";
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import DateandTimeSelection from "../../components/user/DateandTimeSelection";
import GuestDetails from "../../components/user/GuestDetails";
import AddonSelection from "../../components/user/AddonSelection";
import PaymentInformation from "../../components/user/PaymentInformation";
import BookingSummary from "../../components/user/BookingSummary";
import { useVenueDetails } from "../../hooks/user/useVenueDetails";
import { Outlet } from "react-router-dom";

const StepIndicator = ({ stepNumber, currentStep }) => (
  <div
    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold
    ${
      stepNumber === currentStep
        ? "bg-purple-600 text-white"
        : "bg-gray-300 text-gray-700"
    }`}
  >
    {stepNumber}
  </div>
);

export default function BookingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  // Fetch venue either from location state or from API hook
  const venueFromState = location.state?.venue;
  const { data: fetchedVenue, isLoading } = useVenueDetails(id);
  const activeVenue = venueFromState || fetchedVenue;

  // Debug logs
  useEffect(() => {
    console.log("Current path:", location.pathname);
    console.log("Venue from state:", venueFromState);
    console.log("Fetched venue:", fetchedVenue);
  }, [location.pathname, venueFromState, fetchedVenue]);

  // Map step string (last part of URL) to step number
  // location.pathname example: /checkout/123/guests -> parts: ["checkout","123","guests"]
  const pathParts = location.pathname.split("/");
  const stepName = pathParts[3] || ""; // "" means first step (date/time)
  const stepRoutes = {
    "": 1,
    guests: 2,
    addons: 3,
    payment: 4,
  };
  const currentStep = stepRoutes[stepName] || 1;

  // Navigation paths relative to /checkout/:id
  const stepPaths = ["", "guests", "addons", "payment"];

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const [numberOfGuests, setNumberOfGuests] = useState("");
  const [eventType, setEventType] = useState("");
  const [specialRequirements, setSpecialRequirements] = useState("");
  const [contactName, setContactName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [selectedAddons, setSelectedAddons] = useState([]);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardholderName, setCardholderName] = useState("");

  const addOns = [
    { id: "premium-decoration", name: "Premium Decoration", price: 15000 },
    { id: "professional-photography", name: "Photography", price: 25000 },
    { id: "premium-catering", name: "Catering", price: 800, perPerson: true },
    { id: "dj-sound-system", name: "DJ & Sound", price: 12000 },
    { id: "guest-transportation", name: "Transportation", price: 8000 },
  ];

  const timeSlots = [
    { id: "slot1", label: "9:00 AM - 1:00 PM", hours: 4 },
    { id: "slot2", label: "2:00 PM - 6:00 PM", hours: 4 },
    { id: "slot3", label: "7:00 PM - 11:00 PM", hours: 4 },
    { id: "slot4", label: "Full Day (9:00 AM - 11:00 PM)", hours: 14 },
  ];

  const calculateTotal = () => {
    if (!activeVenue || !selectedTimeSlot) return 0;
    const slot = timeSlots.find((slot) => slot.id === selectedTimeSlot);
    const hours = slot?.hours || 0;
    let total = activeVenue.pricePerHour * hours;

    selectedAddons.forEach((addonId) => {
      const addon = addOns.find((a) => a.id === addonId);
      if (addon) {
        total += addon.perPerson
          ? addon.price * (parseInt(numberOfGuests) || 0)
          : addon.price;
      }
    });
    return total;
  };

  const handleAddonToggle = (addonId) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId)
        ? prev.filter((id) => id !== addonId)
        : [...prev, addonId]
    );
  };

  const handleCompleteBooking = () => {
    console.log("Booking Completed", {
      venueId: activeVenue?._id,
      venueName: activeVenue?.venueName,
      selectedDate: selectedDate.toDateString(),
      selectedTimeSlot,
      numberOfGuests,
      eventType,
      specialRequirements,
      contactName,
      phoneNumber,
      selectedAddons,
      totalCost: calculateTotal(),
      paymentDetails: { cardNumber, expiryDate, cvv, cardholderName },
    });
    alert("Booking completed successfully!");
  };

  const handleNavigation = (direction) => {
    const currentIndex = stepPaths.indexOf(stepName);
    let nextIndex = null;
    if (direction === "next" && currentIndex < stepPaths.length - 1) {
      nextIndex = currentIndex + 1;
    } else if (direction === "previous" && currentIndex > 0) {
      nextIndex = currentIndex - 1;
    }

    if (nextIndex !== null) {
      navigate(`/checkout/${id}/${stepPaths[nextIndex]}`, {
        state: { venue: activeVenue },
      });
    }
  };

  const getDaysInMonth = (year, month) =>
    new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  if (isLoading && !venueFromState) return <div>Loading venue details...</div>;

  return (
    <div className="min-h-screen bg-[#eeeeea] p-4 font-sans flex items-center justify-center">
      <div className="flex flex-col lg:flex-row bg-white shadow-lg rounded-lg max-w-6xl w-full">
        <div className="w-full space-y-2 lg:w-2/3 p-8">
          <div className="flex items-center space-x-4 mb-8">
            <StepIndicator stepNumber={1} currentStep={currentStep} />
            <div className="flex-1 h-1 bg-gray-300 rounded-full"></div>
            <StepIndicator stepNumber={2} currentStep={currentStep} />
            <div className="flex-1 h-1 bg-gray-300 rounded-full"></div>
            <StepIndicator stepNumber={3} currentStep={currentStep} />
            <div className="flex-1 h-1 bg-gray-300 rounded-full"></div>
            <StepIndicator stepNumber={4} currentStep={currentStep} />
          </div>

          <Outlet
            context={{
              selectedDate,
              setSelectedDate,
              selectedTimeSlot,
              setSelectedTimeSlot,
              currentMonth,
              setCurrentMonth,
              currentYear,
              setCurrentYear,
              getDaysInMonth,
              getFirstDayOfMonth,
              timeSlots,
              numberOfGuests,
              setNumberOfGuests,
              eventType,
              setEventType,
              specialRequirements,
              setSpecialRequirements,
              contactName,
              setContactName,
              phoneNumber,
              setPhoneNumber,
              addOns,
              selectedAddons,
              handleAddonToggle,
              cardNumber,
              setCardNumber,
              expiryDate,
              setExpiryDate,
              cvv,
              setCvv,
              cardholderName,
              setCardholderName,
              handleCompleteBooking,
            }}
          />

          <div className="flex justify-between mt-8">
            <button
              className={`px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition duration-200
                ${currentStep === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={() => handleNavigation("previous")}
              disabled={currentStep === 1}
            >
              Previous
            </button>
            {currentStep < 4 ? (
              <button
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-200"
                onClick={() => handleNavigation("next")}
              >
                Next
              </button>
            ) : (
              <button
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-200"
                onClick={handleCompleteBooking}
              >
                Complete Booking
              </button>
            )}
          </div>
        </div>

        {activeVenue && (
          <BookingSummary
            venueName={activeVenue.venueName}
            location={activeVenue.location?.city || "Unknown"}
            venueCost={activeVenue.pricePerHour}
            selectedDate={selectedDate}
            selectedTimeSlot={selectedTimeSlot}
            timeSlots={timeSlots}
            currentStep={currentStep}
            numberOfGuests={numberOfGuests}
            eventType={eventType}
            selectedAddons={selectedAddons}
            addOns={addOns}
            calculateTotal={calculateTotal}
          />
        )}
      </div>
    </div>
  );
}
