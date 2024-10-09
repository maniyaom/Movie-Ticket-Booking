// CardDetail.jsx
import React from "react";
import { CreditCard } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { paymentSchema } from "../zodSchema/Validation";

const CardDetail = ({ handlePayment, isLoading }) => {
  
    const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(paymentSchema),
  });

  const onSubmit = (data) => {
    handlePayment(data);
  };

  return (
    <div className="px-4 pt-8 lg:px-8">
      <p className="text-xl font-medium">Payment Details</p>
      <p className="text-gray-400">
        Complete your booking by providing your payment details.
      </p>
      <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
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
              id="email"
              {...register("email")}
              className={`w-full rounded-md border ${
                errors.email ? "border-red-500" : "border-gray-200"
              } px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
              placeholder="your.email@gmail.com"
              disabled={isLoading}
            />
            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
              <CreditCard className="h-4 w-4 text-gray-400" />
            </div>
          </div>
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Card Holder Field */}
        <div className="mb-4">
          <label
            htmlFor="cardHolder"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Card Holder
          </label>
          <div className="relative">
            <input
              type="text"
              id="cardHolder"
              {...register("cardHolder")}
              className={`w-full rounded-md border ${
                errors.cardHolder ? "border-red-500" : "border-gray-200"
              } px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
              placeholder="Your full name here"
              disabled={isLoading}
            />
            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
              <CreditCard className="h-4 w-4 text-gray-400" />
            </div>
          </div>
          {errors.cardHolder && (
            <p className="text-red-500 text-xs mt-1">
              {errors.cardHolder.message}
            </p>
          )}
        </div>

        {/* Card Details Fields */}
        <div className="mb-4">
          <label
            htmlFor="cardDetails"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Card Details
          </label>
          <div className="flex flex-wrap sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            {/* Card Number */}
            <div className="relative w-full sm:w-7/12">
              <input
                type="text"
                id="cardNumber"
                {...register("cardNumber")}
                className={`w-full rounded-md border ${
                  errors.cardNumber ? "border-red-500" : "border-gray-200"
                } px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
                placeholder="xxxx-xxxx-xxxx-xxxx"
                disabled={isLoading}
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <CreditCard className="h-4 w-4 text-gray-400" />
              </div>
              {errors.cardNumber && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.cardNumber.message}
                </p>
              )}
            </div>
            {/* Expiry Date */}
            <div className="w-full sm:w-24">
              <input
                type="text"
                id="expiryDate"
                {...register("cardExpiry")}
                className={`w-full rounded-md border ${
                  errors.cardExpiry ? "border-red-500" : "border-gray-200"
                } px-4 py-3 text-sm shadow-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
                placeholder="MM/YY"
                disabled={isLoading}
              />
              {errors.cardExpiry && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.cardExpiry.message}
                </p>
              )}
            </div>
            {/* CVC */}
            <div className="w-full sm:w-16">
              <input
                type="text"
                id="cvc"
                {...register("cvc")}
                className={`w-full rounded-md border ${
                  errors.cvc ? "border-red-500" : "border-gray-200"
                } px-4 py-3 text-sm shadow-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
                placeholder="CVC"
                disabled={isLoading}
              />
              {errors.cvc && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.cvc.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`mt-4 mb-8 w-full rounded-md bg-blue-500 px-6 py-3 font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Make Payment"}
        </button>
      </form>
    </div>
  );
};

export default CardDetail;
