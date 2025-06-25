import React from "react";
import { useOutletContext } from "react-router-dom";

const PaymentInformationPage = () => {
  const {
    cardNumber,
    setCardNumber,
    expiryDate,
    setExpiryDate,
    cvv,
    setCvv,
    cardholderName,
    setCardholderName,
    handleCompleteBooking,
  } = useOutletContext();

  return (
    <>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Payment</h2>
      <p className="text-gray-600 mb-6">Complete your booking</p>

      <div className="mb-6">
        <h3 className="text-xl font-medium text-gray-800 mb-4">
          Payment Information
        </h3>
        <div className="space-y-4">
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
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="1234 5678 9012 3456"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
          </div>

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
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="MM/YY"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
              />
            </div>
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
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="123"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
              />
            </div>
          </div>

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
              onChange={(e) => setCardholderName(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center p-4 bg-green-50 rounded-lg border border-green-200 text-green-800">
        <i className="fas fa-lock text-green-600 mr-3"></i>
        <div>
          <p className="font-semibold">Secure Payment</p>
          <p className="text-sm">
            Your payment information is encrypted and secure. We use
            industry-standard security measures.
          </p>
        </div>
      </div>
    </>
  );
};

export default PaymentInformationPage;
