import { Suspense } from "react";
import PaymentResult from "@/components/pages/payment-page/PaymentResult";

export const metadata = {
  title: "Payment | ShininChrist",
  robots: { index: false },
};

const PaymentResultPage = () => (
  <main className="flex-1 bg-cream py-16 lg:py-24">
    <div className="wrapper-narrow">
      <Suspense fallback={null}>
        <PaymentResult />
      </Suspense>
    </div>
  </main>
);

export default PaymentResultPage;
