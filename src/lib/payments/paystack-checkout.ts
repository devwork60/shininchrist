/**
 * Browser-only helper: sends the visitor to Paystack's secure checkout page for card payment.
 * Card details are typed on Paystack's page, never on ours. When they finish, Paystack returns them to
 * /payment/result on THIS site, which asks Paystack whether the payment really succeeded.
 *
 * This is a full-page redirect on purpose. Paystack's checkout runs a security check that an embedded
 * pop-up cannot complete when third-party cookies or browser extensions interfere, which shows up as
 * "checkout.paystack.com refused to connect". A normal page can complete it.
 */

export interface CheckoutStart {
  url: string;
  accessCode: string;
  reference: string;
}

export const openPaystackCheckout = ({ url }: CheckoutStart) => {
  window.location.assign(url);
};
