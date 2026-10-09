/**
 * Browser-only helper: opens the Paystack checkout as a pop-up on top of OUR page
 * (Paystack Inline v2), instead of sending the visitor to checkout.paystack.com.
 * Card details are still typed into Paystack's secure frame, never into our own page.
 */

interface PaystackPopCallbacks {
  onSuccess?: (transaction: { reference?: string }) => void;
  onCancel?: () => void;
  onLoad?: () => void;
  onError?: (error: { message?: string }) => void;
}

declare global {
  interface Window {
    PaystackPop?: new () => {
      resumeTransaction: (
        accessCode: string,
        callbacks?: PaystackPopCallbacks,
      ) => void;
    };
  }
}

const SCRIPT_SRC = "https://js.paystack.co/v2/inline.js";
let loading: Promise<void> | null = null;
const STALL_AFTER_MS = 12000;

export const STALLED_MESSAGE =
  "The payment window is taking too long to open. Please check your internet connection, turn off any VPN or ad blocker, and try again. If it keeps happening, contact us and we will help you pay.";

const loadScript = () => {
  if (window.PaystackPop) return Promise.resolve();
  loading ??= new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      loading = null;
      reject(new Error("Could not load the payment window."));
    };
    document.head.appendChild(script);
  });
  return loading;
};

/** Removes a pop-up that could not load, so it does not keep covering the page. */
const dismissPopup = () => {
  document
    .querySelectorAll<HTMLIFrameElement>('iframe[src*="checkout.paystack.com"]')
    .forEach((frame) => {
      // The pop-up is added straight to <body>; remove that wrapper (never anything that holds our page).
      let wrapper: HTMLElement = frame;
      while (wrapper.parentElement && wrapper.parentElement !== document.body)
        wrapper = wrapper.parentElement;
      if (!wrapper.querySelector("main, header, footer")) wrapper.remove();
    });
};

export interface CheckoutStart {
  url: string;
  accessCode: string;
  reference: string;
}

/**
 * Opens the pop-up. When the visitor finishes, they go to /payment/result on THIS site, which asks Paystack
 * whether the payment really succeeded. If the pop-up cannot load (blocker, offline), we fall back to
 * Paystack's full-page checkout so the visitor can still pay.
 */
export const openPaystackCheckout = async (
  { url, accessCode, reference }: CheckoutStart,
  onStalled?: (fullPageUrl: string) => void,
) => {
  const finish = () => {
    window.location.href =
      window.location.origin +
      "/payment/result?reference=" +
      encodeURIComponent(reference);
  };

  try {
    await loadScript();
  } catch {
    window.location.href = url;
    return;
  }
  if (!window.PaystackPop) {
    window.location.href = url;
    return;
  }

  // If Paystack's checkout never finishes loading (for example a network or security check blocks it),
  // tell the visitor instead of leaving a blank window.
  let loaded = false;
  const stallTimer = window.setTimeout(() => {
    if (loaded) return;
    dismissPopup();
    onStalled?.(url);
  }, STALL_AFTER_MS);

  new window.PaystackPop().resumeTransaction(accessCode, {
    onLoad: () => {
      loaded = true;
      window.clearTimeout(stallTimer);
    },
    onSuccess: finish,
    // Closing the pop-up is not a failure: the visitor simply stays on the form and can try again.
    onCancel: () => {},
    onError: () => (window.location.href = url),
  });
};
