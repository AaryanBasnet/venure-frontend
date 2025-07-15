import React from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useFormikContext } from "formik";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function DateAndTimeSelectionPage() {
  const {
    currentMonth,
    setCurrentMonth,
    currentYear,
    setCurrentYear,
    getDaysInMonth,
    getFirstDayOfMonth,
    timeSlots,
  } = useOutletContext();

  const { values, setFieldValue } = useFormikContext();
  const navigate = useNavigate();
  const { id } = useParams(); // booking id (if needed)

  const selectedDate = values.selectedDate
    ? new Date(values.selectedDate)
    : null;
  const selectedTimeSlot = values.selectedTimeSlot;

  const handleDateSelect = (date) => {
    setFieldValue("selectedDate", date.toLocaleDateString("en-CA")); // ✅ local time
  };

  const goToPreviousMonth = () => {
    setCurrentMonth((prev) => {
      if (prev === 0) {
        setCurrentYear((y) => y - 1);
        return 11;
      }
      return prev - 1;
    });
  };

  const goToNextMonth = () => {
    setCurrentMonth((prev) => {
      if (prev === 11) {
        setCurrentYear((y) => y + 1);
        return 0;
      }
      return prev + 1;
    });
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize for comparison

    const days = [];

    // Empty grid for alignment
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} />);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentYear, currentMonth, i);
      date.setHours(0, 0, 0, 0); // Normalize for comparison
      const isSelected = selectedDate?.toDateString() === date.toDateString();
      const isToday = date.toDateString() === today.toDateString();
      const isPast = date < today;

      days.push(
        <div
          key={i}
          onClick={() => !isPast && handleDateSelect(date)}
          className={`p-2 text-center rounded-full transition-colors duration-200 select-none
            ${
              isPast
                ? "text-gray-400 cursor-not-allowed"
                : "cursor-pointer hover:bg-gray-100"
            }
            ${isSelected ? "bg-purple-600 text-white" : ""}
            ${
              isToday && !isSelected
                ? "border border-purple-400 text-purple-600"
                : ""
            }
          `}
        >
          {i}
        </div>
      );
    }

    return days;
  };

  return (
    <section>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Date & Time</h2>
      <p className="text-gray-600 mb-6">Select your event date and time</p>

      {/* Date Picker */}
      <div className="mb-8">
        <h3 className="text-xl font-medium text-gray-800 mb-4">Select Date</h3>
        <div className="border border-gray-300 rounded-lg p-4">
          {/* Month Navigation */}
          <div className="flex justify-between items-center mb-4">
            <button
              type="button"
              onClick={goToPreviousMonth}
              aria-label="Previous Month"
              className="p-2 rounded-full hover:bg-gray-200 transition"
            >
              <ChevronLeft className="text-gray-600" />
            </button>
            <span className="text-lg font-semibold text-gray-800">
              {new Date(currentYear, currentMonth).toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </span>
            <button
              type="button"
              onClick={goToNextMonth}
              aria-label="Next Month"
              className="p-2 rounded-full hover:bg-gray-200 transition"
            >
              <ChevronRight className="text-gray-600" />
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 text-sm text-gray-500 font-medium mb-2">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
              <div key={day}>{day}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">{renderCalendarDays()}</div>
        </div>
      </div>

      {/* Time Slot Selection */}
      <div>
        <h3 className="text-xl font-medium text-gray-800 mb-4">
          Select Time Slot
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {timeSlots.map((slot) => (
            <div
              key={slot.id}
              onClick={() => setFieldValue("selectedTimeSlot", slot.id)}
              className={`flex items-center justify-between p-4 border rounded-lg transition cursor-pointer
                ${
                  selectedTimeSlot === slot.id
                    ? "border-purple-600 bg-purple-50"
                    : "border-gray-300 hover:bg-gray-50"
                }`}
            >
              <span className="text-gray-800 font-medium">{slot.label}</span>
            </div>
          ))}
        </div>

        {/* Navigation Button */}
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={() => navigate("guests")}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
