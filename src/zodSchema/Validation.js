// validationSchema.js
import { z } from "zod";

export const paymentSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  cardHolder: z.string().min(1, { message: "Card holder name is required" }),
  cardNumber: z
    .string()
    .regex(/^\d{4}-\d{4}-\d{4}-\d{4}$/, {
      message: "Invalid card number format",
    }),
  cardExpiry: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, {
      message: "Invalid expiry date format (MM/YY)",
    }),
  cvc: z.string().regex(/^\d{3,4}$/, { message: "Invalid CVC" }),
});
