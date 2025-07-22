import React, { useContext, useState } from "react";
import { Outlet, useNavigate, useParams, useLocation } from "react-router-dom";
import { Formik, Form } from "formik";
import BookingSummary from "../../components/user/BookingSummary";
import { useVenueDetails } from "../../hooks/user/useVenueDetails";
import { toast } from "react-toastify";
import { AuthContext } from "../../auth/AuthProvider";

import { useCreateBooking } from "../../hooks/user/useCreateBooking";

import {
  Elements,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// Helpers and constants remain unchanged
const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

const timeSlots = [
  { id: "slot1", label: "9:00 AM - 1:00 PM", hours: 4 },
  { id: "slot2", label: "2:00 PM - 6:00 PM", hours: 4 },
  { id: "slot3", label: "7:00 PM - 11:00 PM", hours: 4 },
  { id: "slot4", label: "Full Day (9:00 AM - 11:00 PM)", hours: 14 },
];
const addOns = [
  { id: "premium-decoration", name: "Premium Decoration", price: 15000 },
  { id: "professional-photography", name: "Photography", price: 25000 },
  { id: "premium-catering", name: "Catering", price: 800, perPerson: true },
  { id: "dj-sound-system", name: "DJ & Sound", price: 12000 },
  { id: "guest-transportation", name: "Transportation", price: 8000 },
];

const initialValues = {
  selectedDate: "",
  selectedTimeSlot: "",
  numberOfGuests: 1,
  eventType: "",
  specialRequirements: "",
  contactName: "",
  phoneNumber: "",
  selectedAddons: [],
  
};

function BookingFormInner() {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const createBooking = useCreateBooking();
  const { data: activeVenue, isLoading } = useVenueDetails(id);

  const stripe = useStripe();
  const elements = useElements();

  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());

  const steps = ["date-time", "guests", "addons", "payment"];
  const currentStepIndex = steps.findIndex((step) =>
    location.pathname.includes(step)
  );
  const isLastStep = steps[currentStepIndex] === "payment";

  const calculateTotal = (values) => {
    if (!activeVenue || !values.selectedTimeSlot) return 0;

    const slot = timeSlots.find((s) => s.id === values.selectedTimeSlot);
    const hours = slot?.hours || 0;
    let total = activeVenue.pricePerHour * hours;

    (values.selectedAddons || []).forEach((addonId) => {
      const addon = addOns.find((a) => a.id === addonId);
      if (addon) {
        total += addon.perPerson
          ? addon.price * (parseInt(values.numberOfGuests) || 0)
          : addon.price;
      }
    });

    return total;
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    if (!user) {
      toast.error("User not logged in");
      setSubmitting(false);
      return;
    }

    if (!stripe || !elements) {
      toast.error("Stripe has not loaded yet.");
      setSubmitting(false);
      return;
    }

    const selectedSlot = timeSlots.find(
      (slot) => slot.id === values.selectedTimeSlot
    );
    const hours = selectedSlot?.hours || 0;

    const payload = {
      customer: user._id,
      venue: id,
      bookingDate: values.selectedDate,
      timeSlot: selectedSlot?.label,
      hoursBooked: hours,
      numberOfGuests: parseInt(values.numberOfGuests),
      eventType: values.eventType,
      specialRequirements: values.specialRequirements || "",
      contactName: values.contactName,
      phoneNumber: values.phoneNumber,
      selectedAddons: (values.selectedAddons || [])
        .map((addonId) => {
          const addon = addOns.find((a) => a.id === addonId);
          return addon ? { ...addon } : null;
        })
        .filter(Boolean),
      totalPrice: calculateTotal(values),
    };

    // Pass stripe elements and cardElement to mutation
    createBooking.mutate(
      {
        bookingData: payload,
        stripe,
        cardElement: elements.getElement(CardElement),
        elements,
      },
      {
        onSuccess: () => {
          setSubmitting(false);
          navigate("/my-bookings");
        },
        onError: (error) => {
          setSubmitting(false);
          toast.error(error.message || "Booking failed");
        },
      }
    );
  };

  const outletContext = {
    currentYear,
    setCurrentYear,
    currentMonth,
    setCurrentMonth,
    getDaysInMonth,
    getFirstDayOfMonth,
    timeSlots,
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#eeeeea] font-sans">
        <p className="text-xl text-gray-700">Loading venue details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#eeeeea] p-4 font-sans flex items-center justify-center">
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ isSubmitting, values }) => (
          <div className="flex flex-col lg:flex-row bg-white shadow-lg rounded-lg max-w-6xl w-full">
            {/* Left Section */}
            <div className="w-full lg:w-2/3 p-8 space-y-6">
              {/* Progress Indicator */}
              <div className="flex justify-start items-center space-x-4 mb-8">
                {steps.map((_, step) => (
                  <React.Fragment key={step}>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold
                        ${
                          step < currentStepIndex
                            ? "bg-purple-600 text-white"
                            : step === currentStepIndex
                            ? "bg-white border-2 border-purple-600 text-purple-600"
                            : "bg-gray-300 text-gray-600"
                        }
                      `}
                    >
                      {step + 1}
                    </div>
                    {step < steps.length - 1 && (
                      <div className="flex-1 h-1 bg-purple-600"></div>
                    )}
                  </React.Fragment>
                ))}
              </div>

              <p className="text-gray-600 mb-6">Complete your booking</p>

              <Form>
                <Outlet context={outletContext} />
                {isLastStep && (
                  <div className="mt-8">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Processing..." : "Complete Booking"}
                    </button>
                  </div>
                )}
              </Form>
            </div>

            {/* Right Section */}
            <div className="w-full lg:w-1/3 p-8 bg-gray-50 lg:rounded-r-lg lg:rounded-l-none rounded-b-lg flex flex-col justify-between">
              <BookingSummary
                venueName={activeVenue?.venueName || "Venue Name"}
                location={activeVenue?.location?.city || "City, Country"}
                selectedDate={values.selectedDate}
                selectedTimeSlotLabel={
                  timeSlots.find((slot) => slot.id === values.selectedTimeSlot)
                    ?.label || "N/A"
                }
                calculateTotal={() => calculateTotal(values)}
                timeSlots={timeSlots}
                addOns={addOns}
              />
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Elements stripe={stripePromise}>
      <BookingFormInner />
    </Elements>
  );
}
