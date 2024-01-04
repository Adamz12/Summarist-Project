import { loadStripe, Stripe, StripeError } from "@stripe/stripe-js";

let stripePromise: Promise<Stripe | null>;

const initialiseStripe = async (): Promise<Stripe | null> => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      "pk_test_51OBhEZDT3UN6tZEwe9ECQXoXLPmWWX8EidNxJbX8nEJTlqk1zK87AIxRFawGi33qwzE0GIdHn8cVmGFg5f1HHcus001Qzc9rUc"
    ).catch((error: StripeError) => {
      console.error("Failed to initialize Stripe:", error);
      return null;
    });
  }
  return stripePromise;
};

export default initialiseStripe;
