import React from "react";
import { useFormikContext } from "formik";
import { useNavigate, useParams } from "react-router-dom";


const formatCardNumber = (digits) => {
  let result = "";
  for (let i = 0; i < digits.length; i++) {
   
    if (i > 0 && i % 4 === 0) {
      result += " ";
    }
    result += digits[i];
  }

  
  if (digits.length > 0 && digits.length % 4 === 0 && !result.endsWith(" ")) {
    result += " ";
  }
  return result;
};

const PaymentInformationPage = () => {
  const { values, setFieldValue } = useFormikContext();
  const navigate = useNavigate();
  const { id } = useParams();
  const { cardNumber, expiryDate, cvv, cardholderName } = values;

  return (
    <>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Payment</h2>
      <p className="text-gray-600 mb-6">Complete your booking</p>

      <div className="mb-6">
        <h3 className="text-xl font-medium text-gray-800 mb-4">
          Payment Information
        </h3>
        <div className="space-y-4">
          {/* Card Number Input */}
          <div>
            <label
              htmlFor="cardNumber"
              className="block text-gray-700 text-sm font-medium mb-1"
            >
              Card Number
            </label>
            <input
              type="text"
              id="cardNumber"
              inputMode="numeric"
              maxLength={19} // Max length for 16 digits + 3 spaces
              placeholder="1234 5678 9012 3456"
              value={cardNumber}
              onChange={(e) => {
                const input = e.target;
                const inputValue = input.value;
                const cursorPos = input.selectionStart;

                const digitsOnly = inputValue.replace(/\D/g, "");

                const limitedDigits = digitsOnly.slice(0, 16);

                const formatted = formatCardNumber(limitedDigits);

                let newCursorPos = 0;
                let originalDigitsCount = 0;

                for (let i = 0; i < cursorPos; i++) {
                  if (/\d/.test(inputValue[i])) {
                    originalDigitsCount++;
                  }
                }

                newCursorPos = originalDigitsCount;

                if (originalDigitsCount > 4) newCursorPos++;
                if (originalDigitsCount > 8) newCursorPos++;
                if (originalDigitsCount > 12) newCursorPos++;

                if (
                  inputValue.length > 0 &&
                  inputValue.endsWith(" ") &&
                  formatted.endsWith(" ") &&
                  cursorPos === inputValue.length
                ) {
                  newCursorPos = formatted.length;
                }


                newCursorPos = Math.min(newCursorPos, formatted.length);

                setFieldValue("cardNumber", formatted);


                requestAnimationFrame(() => {
                  const inputEl = document.getElementById("cardNumber");
                  if (inputEl) {
                    inputEl.setSelectionRange(newCursorPos, newCursorPos);
                  }
                });
              }}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 font-mono" // Use monospace font for better digit alignment
            />
          </div>

          {/* Expiry Date Input */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="expiryDate"
                className="block text-gray-700 text-sm font-medium mb-1"
              >
                Expiry Date
              </label>
              <input
                type="text"
                id="expiryDate"
                inputMode="numeric"
                maxLength={5} // MM/YY
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="MM/YY"
                value={expiryDate}
                onChange={(e) => {
                  // Allow only digits
                  let value = e.target.value.replace(/[^\d]/g, "");

                  // Automatically add slash after 2 digits
                  if (value.length > 2) {
                    value = value.substring(0, 2) + "/" + value.substring(2, 4);
                  }

                  const month = parseInt(value.substring(0, 2), 10);
                  if (value.length >= 2 && (month < 1 || month > 12)) {
                    
                    value = ""; // Clear if month is invalid
                  }

                  setFieldValue("expiryDate", value);
                }}
                onKeyDown={(e) => {
                  
                  if (
                    (e.key === "Backspace" || e.key === "Delete") &&
                    expiryDate.length === 3 && // Length is "MM/"
                    expiryDate.includes("/")
                  ) {
                    e.preventDefault(); // Prevent default backspace behavior
                    setFieldValue("expiryDate", expiryDate.slice(0, 2)); // Remove the slash
                  }
                }}
              />
            </div>

            {/* CVV Input */}
            <div>
              <label
                htmlFor="cvv"
                className="block text-gray-700 text-sm font-medium mb-1"
              >
                CVV
              </label>
              <input
                type="text"
                id="cvv"
                maxLength={4} // CVV can be 3 or 4 digits
                inputMode="numeric"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="123"
                value={cvv}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "").slice(0, 4);
                  setFieldValue("cvv", value);
                }}
              />
            </div>
          </div>

          {/* Cardholder Name Input */}
          <div>
            <label
              htmlFor="cardholderName"
              className="block text-gray-700 text-sm font-medium mb-1"
            >
              Cardholder Name
            </label>
            <input
              type="text"
              id="cardholderName"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Name on card"
              value={cardholderName}
              onChange={(e) => setFieldValue("cardholderName", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Secure Payment Information Box */}
      <div className="flex items-center p-4 bg-green-50 rounded-lg border border-green-200 text-green-800">
        <i className="fas fa-lock text-green-600 mr-3"></i>{" "}
        {/* Font Awesome lock icon */}
        <div>
          <p className="font-semibold">Secure Payment</p>
          <p className="text-sm">
            Your payment information is encrypted and secure. We use
            industry-standard security measures.
          </p>
        </div>
      </div>

      {/* Navigation Button */}
      <div className="mt-6 flex justify-between">
        <button
          type="button"
          onClick={() => navigate(`/checkout/${id}/addons`)}
          className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors duration-200"
        >
          Back
        </button>
      </div>
    </>
  );
};

export default PaymentInformationPage;
