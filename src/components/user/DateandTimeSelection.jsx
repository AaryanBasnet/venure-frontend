import React from "react";

const DateAndTimeSelectionPage = ({
  selectedDate, setSelectedDate,
  selectedTimeSlot, setSelectedTimeSlot,
  currentMonth, setCurrentMonth,
  currentYear, setCurrentYear,
  getDaysInMonth, getFirstDayOfMonth,
  timeSlots,
  onNext
}) => {

  const renderCalendarDays = () => { /* ... (same as before, moved here) */
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="text-gray-400 p-2 text-center"></div>);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentYear, currentMonth, i);
      const isSelected = selectedDate && selectedDate.toDateString() === date.toDateString();
      const isToday = date.toDateString() === new Date().toDateString();

      days.push(
        <div
          key={i}
          className={`p-2 text-center rounded-full cursor-pointer transition-colors duration-200
            ${isSelected ? 'bg-purple-600 text-white' : ''}
            ${isToday && !isSelected ? 'border border-purple-400 text-purple-600' : 'text-gray-800 hover:bg-gray-200'}
          `}
          onClick={() => setSelectedDate(date)}
        >
          {i}
        </div>
      );
    }
    return days;
  };

  const goToPreviousMonth = () => { /* ... (same as before, moved here) */
    setCurrentMonth(prevMonth => {
      if (prevMonth === 0) {
        setCurrentYear(prevYear => prevYear - 1);
        return 11;
      }
      return prevMonth - 1;
    });
  };

  const goToNextMonth = () => { /* ... (same as before, moved here) */
    setCurrentMonth(prevMonth => {
      if (prevMonth === 11) {
        setCurrentYear(prevYear => prevYear + 1);
        return 0;
      }
      return prevMonth + 1;
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
            <button className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-200" onClick={goToPreviousMonth}>
              <i className="fas fa-chevron-left text-gray-600"></i>
            </button>
            <span className="text-lg font-semibold text-gray-800">
              {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long', year: 'numeric' })}
            </span>
            <button className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-200" onClick={goToNextMonth}>
              <i className="fas fa-chevron-right text-gray-600"></i>
            </button>
          </div>
          <div className="grid grid-cols-7 text-center text-sm font-medium text-gray-500 mb-2">
            <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {renderCalendarDays()}
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-medium text-gray-800 mb-4">Select Time Slot</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {timeSlots.map(slot => (
            <div
              key={slot.id}
              className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors duration-200
                ${selectedTimeSlot === slot.id ? 'border-purple-600 bg-purple-50' : 'border-gray-300 hover:bg-gray-50'}
              `}
              onClick={() => setSelectedTimeSlot(slot.id)}
            >
              <span className="text-gray-800 font-medium">{slot.label}</span>
              <i className={`${slot.icon} text-gray-500`}></i>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DateAndTimeSelectionPage;