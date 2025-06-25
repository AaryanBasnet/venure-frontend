import React from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useFormikContext } from "formik";

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
  const navigate = useNavigate();
  const { id } = useParams(); // ← Fixes the undefined `id`

  const { values, setFieldValue } = useFormikContext();

  const selectedDate = values.selectedDate
    ? new Date(values.selectedDate)
    : null;
  const selectedTimeSlot = values.selectedTimeSlot;

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="text-gray-400 p-2 text-center"></div>
      );
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentYear, currentMonth, i);
      const isSelected = selectedDate?.toDateString() === date.toDateString();
      const isToday = date.toDateString() === new Date().toDateString();

      days.push(
        <div
          key={i}
          className={`p-2 text-center rounded-full cursor-pointer transition-colors duration-200
            ${isSelected ? "bg-purple-600 text-white" : ""}
            ${
              isToday && !isSelected
                ? "border border-purple-400 text-purple-600"
                : "text-gray-800 hover:bg-gray-200"
            }
          `}
          onClick={() => setFieldValue("selectedDate", date.toISOString().split('T')[0])}
        >
          {i}
        </div>
      );
    }

    return days;
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

  return (
    <>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Date & Time</h2>
      <p className="text-gray-600 mb-6">Select your event date and time</p>

      <div className="mb-8">
        <h3 className="text-xl font-medium text-gray-800 mb-4">Select Date</h3>
        <div className="border border-gray-300 rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={goToPreviousMonth}
              className="p-2 rounded-full hover:bg-gray-200 transition"
            >
              <i className="fas fa-chevron-left text-gray-600"></i>
            </button>
            <span className="text-lg font-semibold text-gray-800">
              {new Date(currentYear, currentMonth).toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </span>
            <button
              onClick={goToNextMonth}
              className="p-2 rounded-full hover:bg-gray-200 transition"
            >
              <i className="fas fa-chevron-right text-gray-600"></i>
            </button>
          </div>

          <div className="grid grid-cols-7 text-sm text-gray-500 font-medium mb-2">
            <div>Su</div>
            <div>Mo</div>
            <div>Tu</div>
            <div>We</div>
            <div>Th</div>
            <div>Fr</div>
            <div>Sa</div>
          </div>

          <div className="grid grid-cols-7 gap-2">{renderCalendarDays()}</div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-medium text-gray-800 mb-4">
          Select Time Slot
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {timeSlots.map((slot) => (
            <div
              key={slot.id}
              className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition
                ${
                  selectedTimeSlot === slot.id
                    ? "border-purple-600 bg-purple-50"
                    : "border-gray-300 hover:bg-gray-50"
                }
              `}
              onClick={() => setFieldValue("selectedTimeSlot", slot.id)}
            >
              <span className="text-gray-800 font-medium">{slot.label}</span>
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-end">
          <button
          type="button"
            onClick={() => navigate("guests")}
            className="bg-purple-600 text-white px-4 py-2 rounded"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
