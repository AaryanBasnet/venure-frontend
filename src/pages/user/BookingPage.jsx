import React, { useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import DateandTimeSelection from '../../components/user/DateandTimeSelection';
import GuestDetails from '../../components/user/GuestDetails';
import AddonSelection from '../../components/user/AddonSelection';
import PaymentInformation from '../../components/user/PaymentInformation';
import BookingSummary from '../../components/user/BookingSummary';

// Dummy StepIndicator component (replace with your actual one if available)
const StepIndicator = ({ stepNumber, currentStep }) => (
  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold
    ${stepNumber === currentStep ? 'bg-purple-600 text-white' : 'bg-gray-300 text-gray-700'}`}>
    {stepNumber}
  </div>
);

// Main BookingPage component
export default function BookingPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const stepRoutes = {
    '/': 1,
    '/guests': 2,
    '/addons': 3,
    '/payment': 4,
  };

  const currentStep = stepRoutes[location.pathname] || 1;

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const [numberOfGuests, setNumberOfGuests] = useState('');
  const [eventType, setEventType] = useState('');
  const [specialRequirements, setSpecialRequirements] = useState('');
  const [contactName, setContactName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [selectedAddons, setSelectedAddons] = useState([]);

  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardholderName, setCardholderName] = useState('');

  const venueCost = 50000;

  const addOns = [
    { id: 'premium-decoration', name: 'Premium Decoration', description: 'Elegant floral arrangements and lighting', price: 15000 },
    { id: 'professional-photography', name: 'Professional Photography', description: '8-hour coverage with edited photos', price: 25000 },
    { id: 'premium-catering', name: 'Premium Catering', description: 'Per person premium menu', price: 800, perPerson: true },
    { id: 'dj-sound-system', name: 'DJ & Sound System', description: 'Professional DJ with premium sound equipment', price: 12000 },
    { id: 'guest-transportation', name: 'Guest Transportation', description: 'Shuttle service for guests', price: 8000 },
  ];

  const timeSlots = [
    { id: 'slot1', label: '9:00 AM - 1:00 PM', icon: 'fas fa-clock' },
    { id: 'slot2', label: '2:00 PM - 6:00 PM', icon: 'fas fa-clock' },
    { id: 'slot3', label: '7:00 PM - 11:00 PM', icon: 'fas fa-clock' },
    { id: 'slot4', label: 'Full Day (9:00 AM - 11:00 PM)', icon: 'fas fa-clock' },
  ];

  const calculateTotal = () => {
    let total = venueCost;
    selectedAddons.forEach(addonId => {
      const addon = addOns.find(a => a.id === addonId);
      if (addon) {
        if (addon.perPerson) {
          total += addon.price * (parseInt(numberOfGuests) || 0);
        } else {
          total += addon.price;
        }
      }
    });
    return total;
  };

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const handleAddonToggle = (addonId) => {
    setSelectedAddons(prev => prev.includes(addonId)
      ? prev.filter(id => id !== addonId)
      : [...prev, addonId]);
  };

  const handleCompleteBooking = () => {
    console.log("Booking Completed!", {
      selectedDate: selectedDate.toDateString(),
      selectedTimeSlot,
      numberOfGuests,
      eventType,
      specialRequirements,
      contactName,
      phoneNumber,
      selectedAddons,
      totalCost: calculateTotal(),
      paymentDetails: {
        cardNumber,
        expiryDate,
        cvv,
        cardholderName,
      }
    });
    alert("Booking completed successfully!");
    // navigate('/confirmation');
  };

  const handleNavigation = (direction) => {
    const paths = ['/', '/guests', '/addons', '/payment'];
    const currentIndex = paths.indexOf(location.pathname);

    if (direction === 'next' && currentIndex < paths.length - 1) {
      navigate(paths[currentIndex + 1]);
    } else if (direction === 'previous' && currentIndex > 0) {
      navigate(paths[currentIndex - 1]);
    }
  };

  return (
    <div className="min-h-screen bg-[#eeeeea] p-4 font-sans flex items-center justify-center">
      <div className="flex flex-col  lg:flex-row bg-white shadow-lg rounded-lg max-w-6xl w-full">
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

          <Routes>
            <Route path="/" element={
              <DateandTimeSelection
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                selectedTimeSlot={selectedTimeSlot}
                setSelectedTimeSlot={setSelectedTimeSlot}
                currentMonth={currentMonth}
                setCurrentMonth={setCurrentMonth}
                currentYear={currentYear}
                setCurrentYear={setCurrentYear}
                getDaysInMonth={getDaysInMonth}
                getFirstDayOfMonth={getFirstDayOfMonth}
                timeSlots={timeSlots}
              />
            } />
            <Route path="/guests" element={
              <GuestDetails
                numberOfGuests={numberOfGuests}
                setNumberOfGuests={setNumberOfGuests}
                eventType={eventType}
                setEventType={setEventType}
                specialRequirements={specialRequirements}
                setSpecialRequirements={setSpecialRequirements}
                contactName={contactName}
                setContactName={setContactName}
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
              />
            } />
            <Route path="/addons" element={
              <AddonSelection
                addOns={addOns}
                selectedAddons={selectedAddons}
                handleAddonToggle={handleAddonToggle}
                numberOfGuests={numberOfGuests}
              />
            } />
            <Route path="/payment" element={
              <PaymentInformation
                cardNumber={cardNumber}
                setCardNumber={setCardNumber}
                expiryDate={expiryDate}
                setExpiryDate={setExpiryDate}
                cvv={cvv}
                setCvv={setCvv}
                cardholderName={cardholderName}
                setCardholderName={setCardholderName}
                handleCompleteBooking={handleCompleteBooking}
              />
            } />
          </Routes>

          <div className="flex justify-between mt-8">
            <button
              className={`px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition duration-200
                ${currentStep === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => handleNavigation('previous')}
              disabled={currentStep === 1}
            >
              Previous
            </button>
            {currentStep < 4 ? (
              <button
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-200"
                onClick={() => handleNavigation('next')}
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

        <BookingSummary
          venueCost={venueCost}
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
      </div>
    </div>
  );
}
