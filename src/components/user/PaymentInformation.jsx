import React from "react";
import { CardElement } from "@stripe/react-stripe-js";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: "16px",
      color: "#32325d",
      "::placeholder": { color: "#a0aec0" },
    },
    invalid: { color: "#fa755a" },
  },
};

const PaymentInformationPage = () => {
  return (
    <>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Payment</h2>

      <div className="mb-6">
        <h3 className="text-xl font-medium text-gray-800 mb-4">
          Card Information
        </h3>
        <div className="p-4 border border-gray-300 rounded-lg bg-white">
          <CardElement options={CARD_ELEMENT_OPTIONS} />
        </div>
      </div>

      <div className="flex items-center p-4 bg-green-50 rounded-lg border border-green-200 text-green-800">
        <i className="fas fa-lock text-green-600 mr-3"></i>
        <div>
          <p className="font-semibold">Secure Payment</p>
          <p className="text-sm">
            We use Stripe for secure and encrypted transactions.
          </p>
        </div>
      </div>
    </>
  );
};

export default PaymentInformationPage;
