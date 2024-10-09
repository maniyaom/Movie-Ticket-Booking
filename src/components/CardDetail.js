import React from "react";
import { CreditCard, MapPin } from "lucide-react";

const CardDetail = () => {
  return (
    <div className="px-4 pt-8 lg:px-8">
      <p className="text-xl font-medium">Payment Details</p>
      <p className="text-gray-400">
        Complete your booking by providing your payment details.
      </p>
      <form className="mt-6">
        {/* Email Field */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email
          </label>
          <div className="relative">
            <input
              type="email"
              required
              id="email"
              name="email"
              className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="your.email@gmail.com"
            />
            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
              <CreditCard className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Card Holder Field */}
        <div className="mb-4">
          <label
            htmlFor="card-holder"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Card Holder
          </label>
          <div className="relative">
            <input
              type="text"
              id="card-holder"
              name="card-holder"
              className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Your full name here"
            />
            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
              <CreditCard className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Card Details Fields */}
        <div className="mb-4">
          <label
            htmlFor="card-details"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Card Details
          </label>
          <div className="flex flex-wrap sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            {/* Card Number */}
            <div className="relative w-full sm:w-7/12">
              <input
                type="text"
                id="card-no"
                name="card-no"
                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="xxxx-xxxx-xxxx-xxxx"
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <CreditCard className="h-4 w-4 text-gray-400" />
              </div>
            </div>
            {/* Expiry Date */}
            <input
              type="text"
              name="credit-expiry"
              className="w-full sm:w-24 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="MM/YY"
            />
            {/* CVC */}
            <input
              type="text"
              name="credit-cvc"
              className="w-full sm:w-16 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="CVC"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`mt-4 mb-8 w-full rounded-md bg-blue-500 px-6 py-3 font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            isLoading && "opacity-50 cursor-not-allowed"
          }`}
        ></button>
      </form>
    </div>
  );
};

export default CardDetail;
